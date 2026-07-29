# Rituals Screen

## Customer job

`/rituals` helps a shopper who is unsure where to begin choose one practical goal, understand a short care sequence, and continue to a small set of approved products.

This is a guided discovery screen. It is not a diagnosis tool, a medical consultation, a long-form article, or a checkout screen.

## Conversion path

```text
Goal choice
  → complete three-step ritual
    → matched approved products with price and availability
      → product detail or full catalogue
```

The conversion strategy reduces choice before it asks for a product click. The shopper can change goals without leaving the page, and out-of-stock status remains visible.

## Information architecture

1. Hero: promise, two actions, and three trust principles.
2. Goal picker: daily softness, weekly renewal, or hair nourishment.
3. Ritual plan: duration, rhythm, and three complete steps.
4. Product set: approved fixtures with price, availability, and detail links.
5. Brand note: a realistic consistency message and professional-advice boundary.

## Responsive behavior

- Desktop: split hero, three choice controls, horizontal three-step plan, and wide product cards.
- Tablet: stacked hero, single-column headings, and preserved product-card hierarchy.
- Phone: full-width actions, stacked goal controls, vertical steps, vertical product cards, and no horizontal scrolling.
- Grid tracks use `minmax(0, …)` or `min(100%, …)` so text and cards cannot force clipped layouts.

## Token map

| UI decision | Token |
| --- | --- |
| Canvas and panels | `--phekong-bg`, `--phekong-surface`, `--phekong-surface-2` |
| Brand and action emphasis | `--phekong-brand`, `--phekong-brand-strong`, `--phekong-accent` |
| Text and boundaries | `--phekong-ink`, `--phekong-muted`, `--phekong-border` |
| Status | `--phekong-success`, `--phekong-danger`, `--phekong-accent-soft` |
| Layout rhythm | `--phekong-space-1` through `--phekong-space-8` |
| Shape | `--phekong-radius-lg`, `--phekong-radius-xl`, `--phekong-radius-pill` |
| Depth and motion | `--phekong-shadow`, `--phekong-card-shadow`, `--phekong-motion-fast` |

## Component map

```text
src/app/rituals/page.tsx
└── ApplicationShell
    └── RitualsScreen
        ├── HeroSeal (private visual helper)
        └── RitualProductCard (private product helper)
```

Files:

- `src/components/rituals/RitualsScreen.tsx`
- `src/components/rituals/rituals-screen.css`
- `src/components/rituals/RitualsScreen.test.tsx`
- `src/components/rituals/RitualsScreen.stories.tsx`

## Test and Storybook contract

- Default story: daily softness.
- Alternate story: hair nourishment.
- Interaction story: switch to weekly renewal and expose out-of-stock status.
- Component tests: approved product routes, plan switching, availability visibility, and the professional-advice boundary.

## Design references

These sites were studied for patterns, not copied for branding or composition:

1. [Rituals](https://www.rituals.com/en-us/skin-care-test.html) — soulful framing and short guided discovery.
2. [Aesop](https://www.aesop.com/library/how-to-curate-a-skincare-regimen.html) — editorial pacing and regimen storytelling.
3. [The Ordinary](https://theordinary.com/en-ca/skincare-regimen-builder.html) — concern-first questions and clear sequencing.
4. [Sephora](https://www.sephora.com/beauty/best-skincare-routine-for-me) — broad concern taxonomy.
5. [Ulta Beauty](https://www.ulta.com/discover/skin/korean-skin-care-routine) — beginner-friendly routine education.
6. [Glossier](https://www.glossier.com/collections/skincare-sets) — compact sets and low-friction selection.
7. [Kiehl's](https://www.kiehls.com/skincare-services/routine-finder) — short quiz framing and progress clarity.
8. [Nécessaire](https://necessaire.com/products/the-body-intro-set-hinoki) — body-care set hierarchy.
9. [The Body Shop](https://us.thebodyshop.com/blogs/body-care/the-best-body-care-routine-for-you) — clear scrub, wash, and moisturize steps.
10. [Typology](https://www.typology.com/carnet/dans-quel-ordre-appliquer-ses-produits-de-soin-visage) — calm educational hierarchy.
11. [Lush](https://www.lush.com/us/en_us/c/body-care) — benefit-led browsing.
12. [Fenty Skin](https://fentybeauty.com/pages/skincare-routines) — direct routine bundles and conversion actions.
13. [Clinique](https://www.clinique.com/3-step-skincare) — a simple three-step system.
14. [CeraVe](https://www.cerave.com/skin-smarts/skincare-routines) — accessible, minimal guidance.
15. [Paula's Choice](https://www.paulaschoice.com/expert-advice/skincare-advice/skin-care-how-tos/how-paulas-choice-skincare-routines-are-different.html) — realistic expectations and essential routines.

## Safety and honesty boundaries

- Use supportive cosmetic language, not medical promises.
- Do not infer the shopper's condition from a selected goal.
- Do not hide low-stock or out-of-stock products.
- Do not claim the chosen ritual is saved or personalized across sessions.
- Keep persistent concerns directed toward a qualified health professional.
