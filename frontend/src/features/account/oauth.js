const errors = {
    oauth_not_configured: 'oauth.notConfigured', oauth_configuration_error: 'oauth.configurationError',
    oauth_cancelled: 'oauth.cancelled', oauth_state_invalid: 'oauth.stateInvalid',
    oauth_identity_invalid: 'oauth.identityInvalid', oauth_email_unverified: 'oauth.emailUnverified',
    oauth_account_conflict: 'oauth.conflict', oauth_recent_login_required: 'oauth.recentLogin',
    oauth_link_session_expired: 'oauth.recentLogin', oauth_provider_failed: 'oauth.failed',
};
export function oauthError(code) { return errors[code] ?? 'oauth.failed'; }
