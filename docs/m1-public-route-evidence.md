# M1 Public Route Evidence

This file captures the verification evidence for the current M1 public-route cleanup.

## Verified routes

- `/about`
- `/services`
- `/contact`
- `/products`
- `/products/[slug]`

## Acceptance criteria

The M1 public-route cleanup is accepted when all of the following are true:

- The public routes render through `ApplicationShell`.
- Breadcrumbs appear on the public routes under the shell.
- Each route has route-specific metadata and a canonical path.
- Preview and non-production environments remain `noindex, nofollow`.
- `sitemap.xml` stays empty outside production.
- The public pages stay responsive and readable on mobile.
- The public route structure uses semantic landmarks and heading hierarchy.
- `npm run lint` passes.
- `npm run build` passes.

## Evidence collected

- Source inspection confirms the public route pages use:
  - `ApplicationShell`
  - `<main>`
  - breadcrumb navigation with `aria-label="Breadcrumb"`
  - section landmarks with `aria-labelledby`
  - ordered heading hierarchy from `h1` through `h3`
- `npm run lint` passed.
- `npm run build` passed.
- The build output includes the public routes and the `robots.txt`/`sitemap.xml` entries in the route table.

## Notes

- This evidence covers the route cleanup requested for M1.
- It does not claim milestone-board completion for later workstreams.
