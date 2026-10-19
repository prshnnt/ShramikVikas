"""Browser-bound authorization code flows; provider tokens never leave this service."""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import logging
import secrets
import sqlite3
from dataclasses import dataclass
from datetime import datetime, timedelta
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlencode, urlsplit
from urllib.request import Request, build_opener, HTTPRedirectHandler

import jwt
from fastapi import HTTPException
from src.config import settings
from src.routes.auth import EMAIL_PATTERN, SESSION_SECONDS, connect, now

FLOW_SECONDS = 600
PROVIDERS = {'google', 'github'}
SAFE_ROUTES = {'/', '/intelligence', '/workspace', '/skills', '/regions', '/occupations',
               '/industries', '/demand', '/forecast', '/spatial', '/reports', '/supply',
               '/profile', '/settings', '/help', '/my-intelligence', '/onboarding'}


class OAuthFailure(Exception):
    def __init__(self, code: str):
        self.code = code
        super().__init__(code)


def digest(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()


def cookie_name(provider: str) -> str:
    prefix = '__Host-' if settings.environment.lower() == 'production' else ''
    return prefix + 'kaushaliq_oauth_' + provider


def safe_return(value: str) -> str:
    if not value or len(value) > 1500 or any(ord(c) < 32 for c in value) or '\\' in value:
        raise OAuthFailure('oauth_redirect_invalid')
    parsed = urlsplit(value)
    # Only known local application paths; encoded paths and protocol-relative URLs are rejected.
    if parsed.scheme or parsed.netloc or parsed.fragment or parsed.path not in SAFE_ROUTES:
        raise OAuthFailure('oauth_redirect_invalid')
    return value


logger = logging.getLogger("kaushaliq.oauth")


def configuration(provider: str, request=None, silent: bool = False) -> tuple[str, str, str]:
    if provider not in PROVIDERS:
        if not silent:
            logger.error(f"[OAuth] Unsupported provider: '{provider}'")
        raise OAuthFailure('oauth_not_configured')
    raw_values = [getattr(settings, f'{provider}_{field}').strip()
                  for field in ('client_id', 'client_secret', 'callback_url')]
    if not all(raw_values[:2]):
        if not silent:
            logger.error(
                f"[OAuth] {provider.capitalize()} OAuth credentials not configured. "
                f"Please ensure {provider.upper()}_CLIENT_ID and {provider.upper()}_CLIENT_SECRET "
                f"environment variables are set on your deployment server."
            )
        raise OAuthFailure('oauth_not_configured')

    # If callback_url is empty or default localhost, but request is from a remote deployed host:
    callback_url = raw_values[2]
    if request:
        proto = request.headers.get('x-forwarded-proto') or request.url.scheme or 'https'
        host = request.headers.get('x-forwarded-host') or request.headers.get('host')
        if host:
            req_host = urlsplit(f"http://{host}").hostname
            cb_host = urlsplit(callback_url).hostname if callback_url else None
            if (not callback_url or cb_host in {'localhost', '127.0.0.1'}) and req_host not in {'localhost', '127.0.0.1'}:
                # Default remote deployments to https even if reverse proxy terminates TLS without x-forwarded-proto
                effective_proto = 'https' if req_host not in {'localhost', '127.0.0.1'} and proto == 'http' else proto
                callback_url = f"{effective_proto}://{host}/api/auth/oauth/{provider}/callback"
                raw_values[2] = callback_url

    if not raw_values[2]:
        if not silent:
            logger.error(f"[OAuth] No callback URL configured for {provider}.")
        raise OAuthFailure('oauth_not_configured')

    expected_path = f'/api/auth/oauth/{provider}/callback'
    parsed = urlsplit(raw_values[2])
    if parsed.path in {'', '/'}:
        raw_values[2] = f"{raw_values[2].rstrip('/')}{expected_path}"
        parsed = urlsplit(raw_values[2])
    values = tuple(raw_values)
    try:
        _ = parsed.port
    except ValueError:
        if not silent:
            logger.error(f"[OAuth] Invalid port in callback URL: '{raw_values[2]}'")
        raise OAuthFailure('oauth_configuration_error') from None
    production = settings.environment.lower() == 'production'
    if (parsed.username or parsed.password or parsed.query or parsed.fragment
            or parsed.path != expected_path
            or parsed.scheme not in {'https', 'http'}
            or not parsed.hostname):
        if not silent:
            logger.error(f"[OAuth] Malformed callback URL: '{raw_values[2]}'")
        raise OAuthFailure('oauth_configuration_error')

    if production and parsed.scheme != 'https':
        if not silent:
            logger.error(f"[OAuth] Callback URL must use HTTPS in production: '{raw_values[2]}'")
        raise OAuthFailure('oauth_configuration_error')

    if settings.api_url:
        api = urlsplit(settings.api_url)
        if api.netloc and parsed.netloc and api.netloc != parsed.netloc:
            logger.warning(f"[OAuth] API_URL netloc '{api.netloc}' does not match callback netloc '{parsed.netloc}'")

    return values


def availability(provider: str) -> str:
    try:
        configuration(provider, silent=True)
        return 'CONFIGURED'
    except OAuthFailure as exc:
        return 'NOT_CONFIGURED' if exc.code == 'oauth_not_configured' else 'CONFIGURATION_ERROR'


def begin_flow(provider: str, response, return_to: str = '/intelligence', user=None, request=None):
    try:
        client_id, _, callback = configuration(provider, request=request)
        return_to = safe_return(return_to)
    except OAuthFailure as exc:
        msg = (
            f"Missing {provider.capitalize()} OAuth credentials. Please set {provider.upper()}_CLIENT_ID "
            f"and {provider.upper()}_CLIENT_SECRET in your server environment."
            if exc.code == 'oauth_not_configured'
            else f"OAuth configuration error: {exc.code}"
        )
        logger.error(f"[OAuth] begin_flow failed for {provider}: {msg}")
        raise HTTPException(
            status_code=503 if exc.code != 'oauth_redirect_invalid' else 400,
            detail=msg
        ) from None
    timestamp = now()
    state, browser, verifier, nonce = (secrets.token_urlsafe(32) for _ in range(4))
    with connect() as db:
        db.execute('BEGIN IMMEDIATE')
        if user is not None:
            current = db.execute('''SELECT expires_at FROM sessions WHERE jti=? AND user_id=?
              AND revoked_at IS NULL AND expires_at>?''', (user['jti'], user['id'], timestamp.isoformat())).fetchone()
            if not current:
                raise HTTPException(401, 'Authentication required.')
            issued = datetime.fromisoformat(current['expires_at']) - timedelta(seconds=SESSION_SECONDS)
            if timestamp - issued > timedelta(minutes=10):
                raise HTTPException(403, 'oauth_recent_login_required')
        db.execute('DELETE FROM oauth_flows WHERE expires_at<=?', (timestamp.isoformat(),))
        db.execute('INSERT INTO oauth_flows VALUES(?,?,?,?,?,?,?,?,?,NULL)',
                   (digest(state), provider, digest(browser), verifier, nonce, return_to,
                    user['id'] if user is not None else None, user['jti'] if user is not None else None,
                    (timestamp + timedelta(seconds=FLOW_SECONDS)).isoformat()))
    response.set_cookie(cookie_name(provider), browser, httponly=True,
                        secure=settings.environment.lower() == 'production', samesite='lax',
                        path='/', max_age=FLOW_SECONDS)
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b'=').decode()
    params = {'client_id': client_id, 'redirect_uri': callback, 'state': state,
              'code_challenge': challenge, 'code_challenge_method': 'S256'}
    if provider == 'google':
        params.update(response_type='code', scope='openid email profile', nonce=nonce)
        endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
    else:
        params.update(scope='user:email')
        endpoint = 'https://github.com/login/oauth/authorize'
    return {'authorizationUrl': endpoint + '?' + urlencode(params)}


def consume_flow(provider: str, state: str, browser: str):
    if provider not in PROVIDERS or not state or not browser or len(state) > 128 or len(browser) > 128:
        raise OAuthFailure('oauth_state_invalid')
    with connect() as db:
        db.execute('BEGIN IMMEDIATE')
        row = db.execute('SELECT * FROM oauth_flows WHERE digest=?', (digest(state),)).fetchone()
        if (not row or row['provider'] != provider or row['consumed_at']
                or datetime.fromisoformat(row['expires_at']) <= now()
                or not hmac.compare_digest(row['browser_digest'], digest(browser))):
            raise OAuthFailure('oauth_state_invalid')
        # Save the local copy, then erase transient secrets and consume atomically before network I/O.
        flow = dict(row)
        db.execute("UPDATE oauth_flows SET consumed_at=?,verifier='',nonce='' WHERE digest=?", (now().isoformat(), row['digest']))
        return flow


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def provider_json(url: str, *, form=None, token=None):
    headers = {'Accept': 'application/json', 'User-Agent': 'ShramikVikas-OAuth'}
    data = None
    if form is not None:
        data = urlencode(form).encode()
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if token is not None:
        headers.update(Authorization='Bearer ' + token, **{'X-GitHub-Api-Version': '2026-03-10'})
    try:
        with build_opener(NoRedirect()).open(Request(url, data=data, headers=headers), timeout=10) as response:
            payload = response.read(1024 * 1024 + 1)
        if len(payload) > 1024 * 1024:
            raise OAuthFailure('oauth_provider_failed')
        return json.loads(payload)
    except (HTTPError, URLError, TimeoutError, OSError, ValueError):
        # Never surface response bodies, tokens, codes, network URLs or internal exceptions.
        raise OAuthFailure('oauth_provider_failed') from None


@dataclass(frozen=True)
class Identity:
    subject: str
    email: str
    name: str


def valid_identity(subject, email, name) -> Identity:
    if (not isinstance(subject, str) or not 1 <= len(subject) <= 255 or not subject.isascii()
            or any(ord(c) < 33 for c in subject)
            or not isinstance(email, str) or len(email) > 254 or not EMAIL_PATTERN.fullmatch(email)):
        raise OAuthFailure('oauth_identity_invalid')
    name = name.strip()[:80] if isinstance(name, str) else ''
    return Identity(subject, email.strip().casefold(), name or email.split('@')[0][:80])


def google_identity(code: str, flow, request=None) -> Identity:
    client, secret, callback = configuration('google', request=request)
    tokens = provider_json('https://oauth2.googleapis.com/token', form={
        'code': code, 'client_id': client, 'client_secret': secret, 'redirect_uri': callback,
        'grant_type': 'authorization_code', 'code_verifier': flow['verifier']})
    if not isinstance(tokens, dict) or not isinstance(tokens.get('id_token'), str):
        raise OAuthFailure('oauth_provider_failed')
    try:
        jwks = jwt.PyJWKClient('https://www.googleapis.com/oauth2/v3/certs', timeout=10)
        key = jwks.get_signing_key_from_jwt(tokens['id_token']).key
        claims = jwt.decode(tokens['id_token'], key, algorithms=['RS256'], audience=client,
                            issuer=['https://accounts.google.com', 'accounts.google.com'],
                            leeway=60,
                            options={'require': ['sub', 'iss', 'aud', 'exp', 'iat', 'nonce']})
        if (not hmac.compare_digest(str(claims['nonce']), flow['nonce'])
                or claims.get('azp', client) != client or claims.get('email_verified') is not True
                or (isinstance(claims['aud'], list) and len(claims['aud']) > 1 and claims.get('azp') != client)):
            raise OAuthFailure('oauth_identity_invalid')
        return valid_identity(claims['sub'], claims.get('email'), claims.get('name'))
    except (jwt.PyJWTError, ValueError, TypeError, KeyError):
        raise OAuthFailure('oauth_identity_invalid') from None


def github_identity(code: str, flow, request=None) -> Identity:
    client, secret, callback = configuration('github', request=request)
    tokens = provider_json('https://github.com/login/oauth/access_token', form={
        'client_id': client, 'client_secret': secret, 'code': code,
        'redirect_uri': callback, 'code_verifier': flow['verifier']})
    if (not isinstance(tokens, dict) or not isinstance(tokens.get('access_token'), str)
            or not tokens['access_token'] or tokens.get('token_type', '').lower() != 'bearer'):
        raise OAuthFailure('oauth_provider_failed')
    profile = provider_json('https://api.github.com/user', token=tokens['access_token'])
    emails = provider_json('https://api.github.com/user/emails', token=tokens['access_token'])
    eligible = [e for e in emails if isinstance(e, dict) and e.get('verified') is True and e.get('primary') is True] if isinstance(emails, list) else []
    if len(eligible) != 1:
        raise OAuthFailure('oauth_email_unverified')
    if not isinstance(profile, dict) or type(profile.get('id')) is not int or profile['id'] <= 0:
        raise OAuthFailure('oauth_identity_invalid')
    return valid_identity(str(profile['id']), eligible[0].get('email'), profile.get('name') or profile.get('login'))


def exchange_identity(provider: str, code: str, flow, request=None) -> Identity:
    if not code or len(code) > 4096:
        raise OAuthFailure('oauth_provider_failed')
    return google_identity(code, flow, request=request) if provider == 'google' else github_identity(code, flow, request=request)


def resolve_identity(provider: str, identity: Identity, flow):
    from src.accounts.demo import user_allowed
    try:
        with connect() as db:
            db.execute('BEGIN IMMEDIATE')
            linked = db.execute('SELECT user_id FROM oauth_identities WHERE provider=? AND subject=?', (provider, identity.subject)).fetchone()
            if flow['user_id']:
                current = db.execute('''SELECT users.* FROM users JOIN sessions ON sessions.user_id=users.id
                  WHERE users.id=? AND sessions.jti=? AND revoked_at IS NULL AND expires_at>?''',
                                     (flow['user_id'], flow['session_jti'], now().isoformat())).fetchone()
                if not current or not current['email_verified'] or not user_allowed(current):
                    raise OAuthFailure('oauth_link_session_expired')
                if linked and linked['user_id'] != current['id']:
                    raise OAuthFailure('oauth_account_conflict')
                existing = db.execute('SELECT subject FROM oauth_identities WHERE provider=? AND user_id=?', (provider, current['id'])).fetchone()
                if existing and existing['subject'] != identity.subject:
                    raise OAuthFailure('oauth_account_conflict')
                user = current
            elif linked:
                user = db.execute('SELECT * FROM users WHERE id=?', (linked['user_id'],)).fetchone()
                if not user or not user['email_verified'] or not user_allowed(user):
                    raise OAuthFailure('oauth_identity_invalid')
            else:
                # Email collision is never sufficient evidence for automatic account linking.
                if db.execute('SELECT 1 FROM users WHERE email=?', (identity.email,)).fetchone():
                    raise OAuthFailure('oauth_account_conflict')
                user_id = secrets.token_urlsafe(18)
                db.execute('''INSERT INTO users(id,name,email,password_hash,created_at,email_verified,password_enabled)
                  VALUES(?,?,?,?,?,1,0)''', (user_id, identity.name, identity.email, b'', now().isoformat()))
                user = db.execute('SELECT * FROM users WHERE id=?', (user_id,)).fetchone()
            if not linked:
                db.execute('INSERT INTO oauth_identities VALUES(?,?,?,?)', (provider, identity.subject, user['id'], now().isoformat()))
            return user
    except sqlite3.IntegrityError:
        raise OAuthFailure('oauth_account_conflict') from None


class OAuthAccessLogFilter(logging.Filter):
    """Uvicorn's ordinary access log must not record callback codes/state."""
    def filter(self, record):
        if isinstance(record.args, tuple) and len(record.args) == 5:
            address, method, path, version, status = record.args
            if isinstance(path, str) and unquote(path.split('?', 1)[0]).startswith('/api/auth/oauth/'):
                record.args = (address, method, path.split('?', 1)[0], version, status)
        return True


logging.getLogger('uvicorn.access').addFilter(OAuthAccessLogFilter())
