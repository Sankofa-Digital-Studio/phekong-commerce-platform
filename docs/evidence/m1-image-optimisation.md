# M1 image optimisation evidence

Captured on 2026-07-29 from the verified
`sankofa_xciv/m1-image-optimisation` production build.

## Before and after

| Contract | Before | After |
| --- | --- | --- |
| Source dimensions | Home declared 960 × 720; shell hero 1200 × 900; cards 720 × 720; detail 1280 × 1280 | Every surface reads the exact intrinsic dimensions from the approved manifest |
| Responsive hints | Split across components; missing on home, cards, and detail | Central `sizes` contracts for shell hero, home story, product cards, and product detail |
| Browser formats | Next default compatible response path | Explicit AVIF negotiation with WebP fallback |
| Failure state | Browser broken-image behavior | Accessible, asset-free fallback that preserves the media container |
| Ownership | Paths and alt text duplicated in UI files | Checksummed inventory with source commit, repository custodian, and `retain-existing-only` rights status |
| Repeatability | Manual preparation and review | `images:prepare`, `images:check`, CI enforcement, and intern-facing documentation |

## Negotiated response bytes

Measurements came from `next start` on the successful production build at
quality 75. The hero was requested at 640px; product assets at 384px. Before
this change an AVIF-capable browser followed Next's default WebP-compatible
format path. The new AVIF response is therefore compared with the retained
WebP fallback, and both are also shown against approved source bytes.

| Asset | Source bytes | WebP fallback | AVIF | AVIF vs source | AVIF vs WebP |
| --- | ---: | ---: | ---: | ---: | ---: |
| `hero-reference` | 671,979 | 26,288 | 24,334 | 96.4% smaller | 7.4% smaller |
| `product-hair-oil` | 69,137 | 4,892 | 4,829 | 93.0% smaller | 1.3% smaller |
| `product-shea-butter` | 69,744 | 4,736 | 4,243 | 93.9% smaller | 10.4% smaller |
| `product-sugar-scrub` | 67,795 | 5,148 | 4,968 | 92.7% smaller | 3.5% smaller |
| `product-turmeric-soap` | 68,440 | 4,040 | 3,916 | 94.3% smaller | 3.1% smaller |
| **Total** | **947,095** | **45,104** | **42,290** | **95.5% smaller** | **6.2% smaller** |

The small product references remain a quality constraint: they are retained
without upscaling because no higher-resolution, rights-approved masters are
available in the repository.

## Observed local checks

| Check | Result |
| --- | --- |
| `npm ci` | Pass; 724 packages installed from the lockfile |
| `npm run images:check` | Pass; 5 assets / 947,095 source bytes validated |
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| Focused affected tests | Pass; 5 files / 17 tests |
| `npm run test:run` | Pass; 21 files / 65 tests |
| `npm run build-storybook` | Pass |
| `npm run build` | Pass; 15 routes generated |

The first full test run emitted a Storybook warning because the shell hero used
quality 85 while the Storybook Next adapter permitted 75. Runtime quality was
standardised at 75 before the successful Storybook and Next production builds.
