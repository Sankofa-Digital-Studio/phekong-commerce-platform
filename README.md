# Phekong Commerce Platform

> **Sankofa Digital Proprietary and Confidential — Not for Distribution**

Custom commerce, booking, inventory, seller-tracking and business intelligence MVP.

## Source of truth

- GitHub Issues: authorised work
- GitHub Projects: delivery status and milestone control
- Pull Requests: review and acceptance evidence
- `/docs`: architecture and operational documentation

## Local setup

1. Install Node.js LTS, Git, GitHub CLI and Docker Desktop. The Supabase CLI is installed from the repository lockfile.
2. Copy `.env.example` to `.env.local`.
3. Run `npm ci`.
4. Run `npm run supabase:m0:windows` on Windows or `npm run supabase:m0:unix` on macOS/Linux to validate the local Supabase baseline.
5. Run `npm run dev`.

## Working rule

Nothing is work until Sankofa Digital has defined, assigned, reviewed and accepted it.
