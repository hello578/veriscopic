# Auth (Veriscopic) — Passwordless + Google

## Supported sign-in methods
- Google OAuth
- Email magic link (OTP) — no passwords

## Why no passwords
- Reduces support + security risk
- Removes "forgot password" UX friction
- Common pattern for enterprise tools

## Email magic link flow
1. User enters email on /auth/login
2. Supabase sends an email with a sign-in link
3. Link returns to /auth/callback
4. Callback completes session exchange and redirects into the product

## Notes
- shouldCreateUser=true means email sign-in acts as sign-up automatically
- /auth routes are disallowed in robots.txt and not indexed
