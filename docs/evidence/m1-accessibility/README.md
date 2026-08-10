# M1 accessibility baseline evidence

## Scope and method

Issue [#30](https://github.com/Sankofa-Digital-Studio/phekong-commerce-platform/issues/30) was audited against the live `ApplicationShell` on `/`, `/about`, `/contact`, `/products`, and `/products/nourishing-shea-butter` at 390x844 and 1440x1000. The repeatable Playwright + axe harness is `scripts/audit-accessibility.mjs`.

Each run records WCAG 2.0 A/AA, 2.1 AA, and 2.2 AA axe results; keyboard focus order and visible indicators; headings and landmarks; form labels; image alternatives; target sizes; horizontal overflow; 200% text resize; state messaging; HTTP status; console failures; and full-page screenshots. Before capture, all input and textarea values are cleared and marked as redacted. No customer data, credentials, request bodies, or submitted form values are captured.

Reproduce against a production server on port 3102:

```powershell
npm run build
npm run start -- -p 3102
$env:A11Y_RUN_ID='local'
node scripts/audit-accessibility.mjs
```

## Three-pass comparison

| Measure | Baseline | Final | Result |
| --- | ---: | ---: | --- |
| Audits | 10 | 10 | Five routes at both required viewports |
| axe violations | 3 | 2 | Bounded target-size defect fixed; two instances belong to one High finding |
| Missing visible focus indicators | 0 | 0 | Pass |
| Horizontal-overflow audits | 0 | 0 | Pass |
| 200% text-resize overflow audits | Not recorded | 0 | Pass |
| Missing image alt attributes | 0 | 0 | Pass |
| Unlabelled form controls | Not recorded | 0 | Pass; audited routes currently expose no form controls |
| Routes with exactly one `main` and one `h1` | 6/10 | 10/10 | Pass after bounded fixes |

The baseline artifact is `baseline-audit-results.json`; the post-fix artifact is `final-audit-results.json`. Baseline screenshots use the route/viewport filename, while post-fix screenshots use the `final-` prefix.

## Findings

| Severity | Finding | Disposition |
| --- | --- | --- |
| Blocker | None observed. | No action. |
| High | When configured local Supabase is unavailable, product detail renders the error boundary and loses its document title at both viewports. The error itself is clearly announced, but axe reports serious `document-title`. | Not expanded in this PR. Tracked separately in [#148](https://github.com/Sankofa-Digital-Studio/phekong-commerce-platform/issues/148). |
| Medium | Desktop carousel slide dots measured below the WCAG 2.2 24px target minimum. | Fixed with a 24px button hit area while preserving the small visual dot. Final axe result is clear. |
| Medium | About and contact nested a second `main` and inherited the shell ready-state `h1`. | Fixed by retaining the shell-owned `main`, disabling the unrelated state panel, and preserving each route's own `h1`. |
| Medium | Catalogue route exposed no page-level `h1` because its reusable Card forced `h2`. | Fixed with an explicit Card `headingLevel` API and regression tests. |
| Low | Generic `div` elements carried ARIA labels that user agents may ignore. | Removed redundant labels; the customer-avatar visual uses `role="img"` with its useful accessible name. Final axe result is clear. |
| Low | axe could not automatically resolve contrast through gradient and pseudo-element layers. This is an automation limitation, not a confirmed failure. | Manually reviewed the approved live tokens; retest after future theme or contributor-branch changes. |

## Contrast review

The live default token pairs were calculated with the WCAG relative-luminance formula. All reviewed normal-text pairs exceed 4.5:1:

| Token pair | Ratio |
| --- | ---: |
| ink / surface | 16.80:1 |
| muted / surface | 5.86:1 |
| brand / surface | 6.85:1 |
| ink / accent-soft | 13.58:1 |
| white / focus | 5.82:1 |
| footer-text / footer-bg | 13.38:1 |
| ink / surface-2 | 13.92:1 |

## Final route matrix

All ten final audits returned HTTP 200, exactly one `main`, exactly one `h1`, no horizontal overflow at normal or 200% text size, no missing alt attributes, no unlabelled controls, no off-screen keyboard stops, and no missing visible focus indicators. Home, about, contact, and catalogue have no axe violations at either viewport. Product detail retains only the two viewport instances of the one High finding tracked in #148.

The contact route intentionally has no active submission form while contact details remain unconfirmed; label coverage is therefore not applicable until a form ships. Existing loading, empty, and error components expose headings and live/alert semantics; the product-detail error state is clear but remains incomplete because of #148's missing title and unavailable fixture fallback.

## Scope boundaries

- No changes were made to contributor branches `feat/m1-about` (PR #144) or `feat/m1-contact` (PR #145).
- The bounded about/contact fixes overlap those route files and must be coordinated during integration; neither contributor PR was merged, overwritten, or silently replaced.
- No screenshots contain form values or personal information.
- No GitHub Project column was moved because project scopes were not available.