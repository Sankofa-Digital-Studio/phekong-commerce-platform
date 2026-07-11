# Public Route UI/UX Handoff

This note captures the current public-route baseline for the live App Router pages and the follow-up rule for issue tracking.

## Scope

- `\/about`
- `\/services`
- `\/contact`
- `\/products\/[slug]`
- Shared shell and public metadata behavior

## Current UI/UX contract

- Keep the public shell readable and calm on mobile first.
- Use breadcrumbs on public routes that sit under the shell.
- Keep route-specific page titles, descriptions, and canonical URLs.
- Do not claim unsupported business capabilities or submission flows.
- Prefer cards, short sections, and visible route context over dense marketing copy.

## SEO baseline

- Production should expose the canonical live origin through `NEXT_PUBLIC_SITE_URL` or the deployment platform equivalent.
- Preview and non-production environments should remain `noindex, nofollow`.
- `sitemap.xml` should stay empty outside production.

## Issue linking

- Issue `#28` is the confirmed SEO baseline and public-route foundation reference.
- Additional route or milestone links should be added only after the relevant issues are queued.
- When those issues exist, link them in the relevant issue comment and keep the page copy aligned with the verified scope.

## Next follow-up

- Map any queued route polish issues to the public pages and note the milestone number in the issue comment.
- If the contact route later receives a live form or backend handoff, document the submission contract before exposing it publicly.

- See [M1 public route evidence](/C:/Users/thoso/phekong-commerce-platform/docs/m1-public-route-evidence.md) for the acceptance criteria and verification proof for the current cleanup.

