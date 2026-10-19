import json
import secrets
import bcrypt
from src.config import settings
from src.routes.auth import connect, now


def allowed() -> bool:
    """Allow demo account whenever enabled in settings (for evaluations & previews)."""
    return bool(settings.demo_account_enabled)


def user_allowed(user) -> bool:
    """Allow demo user if demo accounts are enabled, or allow any standard user."""
    return not user['is_demo'] or allowed()


def ensure_demo_accounts() -> None:
    """Ensure both demo@kaushaliq.local and demo@shramikvikas.local exist in DB with valid passwords and profiles."""
    if not allowed():
        return

    password = settings.demo_account_password or "DemoAccount123!"
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(rounds=12))

    demo_users = [
        ("demo@kaushaliq.local", "KaushalIQ Evaluator Demo"),
        ("demo@shramikvikas.local", "Shramik Vikas Demo"),
    ]

    with connect() as db:
        db.execute("BEGIN IMMEDIATE")
        for email, display_name in demo_users:
            existing = db.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
            if existing:
                user_id = existing["id"]
                db.execute(
                    "UPDATE users SET password_hash=?, email_verified=1, is_demo=1, password_enabled=1 WHERE id=?",
                    (hashed, user_id),
                )
            else:
                user_id = secrets.token_urlsafe(18)
                db.execute(
                    "INSERT INTO users(id, name, email, password_hash, created_at, email_verified, is_demo, password_enabled) VALUES(?,?,?,?,?,1,1,1)",
                    (user_id, display_name, email, hashed, now().isoformat()),
                )

            # Ensure profile sections exist
            region = "in-karnataka"
            from src.accounts import store
            values = {
                'education': {'qualification': 'undergraduate', 'degree': 'B.Tech / B.E.', 'field': 'Computer Science', 'year': 2024, 'origin': 'SELF_REPORTED', 'resume_id': None},
                'interests': ['technology', 'ai', 'data science'],
                'skills': [{'name': name, 'proficiency': 'intermediate', 'origin': 'SELF_REPORTED', 'resume_id': None, 'canonical_id': None, 'taxonomy': None} for name in ['Python', 'React', 'FastAPI', 'Machine Learning']],
                'career': {'goals': ['job', 'upskill'], 'note': 'Evaluator preview demonstration profile'},
                'geography': {'current': region, 'preferred': [region], 'relocation': False, 'remote': True},
                'onboarding': {'step': 3, 'status': 'completed'},
            }
            for section, payload in values.items():
                store.put_section(db, user_id, section, payload)
