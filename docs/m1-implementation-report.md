# M1 implementation report

> **Sankofa Digital Proprietary and Confidential - Not for Distribution**

Status: Recommended implementation sequence  
Prepared: 2026-06-22  
Milestone: M1 - Public Commerce Foundation  
Baseline compared: M0 on `main` at `a0b6f1b`

## Executive decision

Proceed with M1 as a public, read-only commerce foundation. Keep checkout, customer authentication, inventory mutation, booking writes, and administrative access in M2 or later. This boundary delivers visible customer value without weakening the M0 security posture.

The issue backlog assigns 10 M1 tasks totaling 48 estimated hours. The current repository is still a one-page scaffold, but it now has a reproducible Supabase M0 gate and a usable `products` read contract. M1 can therefore build against active products through the anonymous client while retaining typed fixture data as an explicit fallback for design and UI work.

## Sources reviewed

- `Sankofa_Digital_Phekong_MVP_Repository_Tooling_and_Task_Plan.docx`, especially sections 4, 6, 7, 8, 10, 11, and 12.
- `Phekong_MVP_GitHub_Issue_Backlog.csv`, all M1 rows and Supabase-related dependencies.
- Current `main` application scaffold, CI workflow, environment contract, Supabase config, migration, and M0 validators.
- Supabase local development documentation and CLI v2.107.0 release metadata.

## Comparison with the last pass

| Area | M0 baseline | M1 target | Guardrail |
| --- | --- | --- | --- |
| User experience | Status-only landing page | Responsive shell, home, about, contact, catalogue, product detail | No transactional controls presented as functional |
| Data | Migration baseline and closed tables | Read active products only | Anonymous access remains constrained by RLS |
| Design | No implemented design system | Approved tokens and reusable components | Figma issue and responsive states required before implementation |
| Quality | Lint, type-check, unit test, build, Supabase integration gate | Add accessibility and route/component tests | Existing gates remain mandatory |
| SEO | Root metadata only | Route metadata, canonical plan, robots, sitemap, product structured data | No indexable placeholder or duplicate pages |
| Operations | Local M0 validation | Preview-ready public application | No production secret or service-role use |

## Three-pass analysis

### Pass 1 - Scope and dependency fit

The backlog sequence is broadly viable, but M1-06 depends on a product schema that the backlog places in M2. The repository has already implemented a preliminary `public.products` table and an active-product read policy. Treat that schema as an M1 read contract only; do not interpret its presence as acceptance of all M2 database work.

Weakness removed: M1 no longer blocks on the entire M2 transaction milestone. Remaining gap: the product content model still lacks image relationships, categories, service-product distinctions, and merchandising fields. Resolve those through an approved M1 contract issue before building the final catalogue.

### Pass 2 - Feasibility from multiple perspectives

- Customer: the navigation, catalogue, product details, loading, empty, and error states produce a coherent public journey.
- Business: the milestone can demonstrate real products without exposing checkout or unsupported promises.
- Design: tokens and component naming must precede page multiplication, reducing inconsistent one-off UI.
- Engineering: use Server Components for initial catalogue reads, small client islands only for interactive filters, and a repository adapter so fixture and Supabase data share one typed interface.
- Security: use only `NEXT_PUBLIC_SUPABASE_URL` and the browser-safe anonymous key for public reads. Never use the service-role key in M1 pages.
- Accessibility: require semantic landmarks, visible focus, keyboard-operable navigation and filters, sufficient contrast, reduced-motion respect, and 44px mobile touch targets.
- Operations: every pull request must retain lint, type-check, unit test, build, and Supabase M0 validation evidence.

Weakness removed: the plan now has an explicit boundary between public reads and privileged operations. Remaining gap: approved brand assets and real content are external inputs and must be tracked as blocking issues, not improvised in code.

### Pass 3 - Failure-mode review

The likely failures are design work starting without approved responsive states, UI coupling directly to unstable database fields, public pages silently requiring a service-role key, and catalogue work claiming completion with only a happy path. The recommended architecture and Definition of Done below close these paths.

Confidence is high for sequencing and repository fit because it is based on the current code and supplied backlog. Confidence is medium for final content, visual identity, product taxonomy, and hosted Supabase compatibility because those decisions are not yet recorded. Before hosted database work, confirm the remote Postgres major version and project region.

## Recommended implementation sequence

| Order | Issue | Deliverable | Estimate | Acceptance emphasis |
| ---: | --- | --- | ---: | --- |
| 1 | M1-01 | Figma team and project structure | 1h | Foundations, Components, Customer App, Admin, Prototype, Archive |
| 2 | M1-02 | Design tokens and naming standard | 4h | Approved color, type, spacing, radius, state, and component conventions |
| 3 | M1-03 | Responsive application shell | 6h | Header, footer, navigation, skip link, mobile menu, 320px-to-desktop layouts |
| 4 | M1-06 contract slice | Product read model and data adapter | Included in 8h | Typed active-product query, fixtures, loading, empty, error behavior |
| 5 | M1-04 | Home page | 6h | Approved content hierarchy, responsive images, accessible calls to action |
| 6 | M1-05 | About and contact pages | 5h | Accurate placeholders, contact actions, no unimplemented form submission |
| 7 | M1-06 | Product catalogue UI | Remaining 8h | Server-rendered list, accessible filters, resilient states |
| 8 | M1-07 | Product detail UI | 6h | Valid slug behavior, price/stock semantics, not-found state |
| 9 | M1-08 and M1-09 | SEO and image pipeline | 9h | Metadata, canonical rules, robots, sitemap, JSON-LD, `next/image` policy |
| 10 | M1-10 | Accessibility baseline audit | 3h | Keyboard, labels, focus, contrast, landmarks, automated and manual evidence |

Run items 5 and 6 in parallel only after M1-02 and M1-03 are approved. Run the catalogue and product-detail work sequentially because M1-07 consumes the contract established by M1-06.

## Suggested application architecture

```text
src/
  app/
    (marketing)/about/page.tsx
    (marketing)/contact/page.tsx
    products/page.tsx
    products/[slug]/page.tsx
    robots.ts
    sitemap.ts
  components/
    layout/
    marketing/
    products/
    ui/
  lib/
    products/types.ts
    products/repository.ts
    products/supabase-repository.ts
    products/fixture-repository.ts
    supabase/server.ts
```

The page layer consumes `ProductRepository`, not raw Supabase calls. The Supabase implementation selects only approved public fields and always filters `active = true`. The fixture implementation supports deterministic tests and design work. Do not add a service-role client to public page modules.

## Supabase work proposed for M1

1. Keep the M0 migration gate mandatory and run it from npm scripts.
2. Add a typed, read-only product query using the anonymous key and RLS.
3. Confirm the approved public product projection; avoid `select('*')` in production UI code.
4. Add test fixtures for zero, one, many, inactive, out-of-stock, malformed-image, and query-error states.
5. Add integration coverage proving inactive products remain unreadable to anonymous users.
6. Defer product writes, role policies, hosted Auth flows, orders, bookings, and admin behavior to M2.

The existing M0 schema is ahead of the milestone catalogue in some areas. Record that as implemented-but-not-accepted M2 groundwork rather than closing M2 issues without their full acceptance tests.

## Definition of Done

- Every M1 issue has a linked approved design or a recorded design-not-required decision.
- Pages work at 320px, 375px, 768px, 1024px, and wide desktop without horizontal overflow.
- Loading, empty, error, and not-found states are implemented and tested.
- Keyboard navigation, visible focus, labels, headings, landmarks, and contrast pass review.
- Product pages expose no server secret and respect the active-product RLS policy.
- Route metadata, canonical behavior, robots, sitemap, and structured data are verified.
- Images have meaningful alt behavior, defined dimensions, responsive sizing, and optimized formats.
- `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build`, and the appropriate Supabase M0 wrapper pass.
- A Sankofa lead reviews the pull request and all conversations are resolved before merge.

## Risks and decisions required

| Risk or decision | Owner | Required before | Response |
| --- | --- | --- | --- |
| Brand tokens and assets not approved | Lead/Designer | M1-02 close | Record approved palette, typography, logos, and asset rights |
| Product taxonomy and public fields incomplete | Lead/Product | M1-06 implementation | Approve a minimal product read contract and fixture set |
| Hosted Supabase project not yet linked | Lead | First hosted data test | Record region, ownership, recovery, environment, and actual Postgres version |
| Contact-page behavior unclear | Lead/Client | M1-05 close | Choose direct contact links or a separately scoped form backend |
| SEO domain/canonical host unknown | Lead | M1-08 close | Record canonical production origin and preview no-index policy |

## Recommended first issue batch

Activate M1-01, M1-02, and M1-03 first. Add one bounded product-read-contract issue under M1-06 with acceptance criteria for public fields, RLS behavior, fixtures, and error states. Do not activate M1-07 until that contract is accepted. This keeps intern work bounded and makes lead review effective.

## Reference URLs

- https://supabase.com/docs/guides/local-development/overview
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://github.com/supabase/cli/releases/tag/v2.107.0
- https://nextjs.org/docs/app
- https://www.w3.org/WAI/WCAG22/quickref/
