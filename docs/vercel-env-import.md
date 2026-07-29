# Vercel Environment Import Guide

Use [`vercel-env-template.example`](../vercel-env-template.example) as the import source for Vercel.

## Recommended setup

- `Preview` for the GitHub `dev` branch
- `Production` for the GitHub `main` branch
- `Development` only if you specifically want a separate Vercel environment for ad hoc branch testing or local `vercel dev` parity

For this repo, `Preview` and `Production` are usually enough.

## Import order

Import the same template into each environment, then fill the values per environment:

1. `Preview`
2. `Production`
3. `Development` only if you really need it

## Notes

- Set `NEXT_PUBLIC_SITE_URL` to the deployed public origin in `Preview` and `Production`.
- Leave real secret values out of git and out of chat.
- If Vercel already provides the project URL and deployment URL envs, the app can fall back to those for canonical and sitemap generation.
