# Environment variable boundary

Phekong uses separate browser-safe and server-only environment variables. Real credentials must be stored in local untracked environment files or the deployment provider's encrypted environment settings.

## Browser-safe variables

These values may be exposed in the browser bundle and must use the `NEXT_PUBLIC_` prefix.

| Variable | Purpose | Secret? |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous client key, constrained by Row Level Security | No |

The anonymous key is not an administrative credential. Its safety depends on correct database privileges and Row Level Security policies.

## Server-only variables

These values must never use the `NEXT_PUBLIC_` prefix and must never be read by client components.

| Variable | Purpose | Secret? |
| --- | --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | Trusted server operations that intentionally bypass Row Level Security | Yes |

The service-role key must only be used in trusted server code. It must not be placed in browser code, screenshots, issue comments, pull-request descriptions, chat messages or committed files.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Run `npm ci` and then `npm exec -- supabase start`.
3. Copy the local API URL and keys printed by the Supabase CLI into `.env.local`.
4. Run the complete M0 gate (`npm run supabase:m0:windows` on Windows or `npm run supabase:m0:unix` on macOS/Linux) before reviewing or merging migration changes.

`.env.local` is ignored by Git. Only `.env.example`, containing placeholders, is committed.

## Hosted environments

Store hosted values separately for Development, Preview and Production. Production service-role access remains restricted to approved leads. Interns and client-view users must not receive production secrets.

## Rotation rule

Rotate a secret immediately if it is pasted into an issue, pull request, chat, screenshot, build log or committed file. Removing the text later does not make the exposed credential safe again.
