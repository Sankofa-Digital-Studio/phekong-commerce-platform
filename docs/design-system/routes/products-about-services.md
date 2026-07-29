# Products, About, and Services screens

These three screens use one shared visual grammar but solve different ecommerce problems. They are live application screens, not training examples.

## Folder map

```text
src/
├─ app/
│  ├─ products/page.tsx       # Metadata and shell only
│  ├─ about/page.tsx          # Metadata and shell only
│  └─ services/page.tsx       # Metadata and shell only
├─ components/
│  ├─ navigation/
│  │  ├─ CommerceRouteHero.tsx       # Shared route hero and section heading
│  │  ├─ commerce-route-hero.css     # Shared responsive hero rules
│  │  ├─ ProductsScreen.tsx          # Catalogue filtering and product discovery
│  │  ├─ products-screen.css
│  │  ├─ AboutScreen.tsx             # Origin, trust, and brand principles
│  │  ├─ about-screen.css
│  │  ├─ ServicesScreen.tsx          # Guided service selection
│  │  └─ services-screen.css
│  └─ catalogue/ProductCatalogue.tsx # Existing approved catalogue states
└─ styles/phekong-tokens.css          # Shared design-token source of truth
```

Tests and stories sit beside the component they cover. Search for `*.test.tsx` and `*.stories.tsx` inside `src/components/navigation/`.

## What each screen does

| Route | Ecommerce job | Primary conversion | Important boundary |
| --- | --- | --- | --- |
| `/products` | Reduce choice overload | Filter, compare, open a product | Availability remains visible |
| `/about` | Build trust before purchase | Continue to products or rituals | Claims stay tied to the approved origin story |
| `/services` | Convert uncertainty into guided help | Select a service lane and contact | Contact is not presented as a completed booking |

## Reusable component contract

`CommerceRouteHero` owns:

- breadcrumbs;
- one customer-facing promise;
- primary and secondary actions;
- three short proof points;
- an image-free visual panel;
- earth, botanical, and gold tone variants.

Do not copy the hero markup into a route. Add a prop only when the new information belongs on more than one route.

## Mobile contract

At widths below `38rem`:

- hero columns stack;
- both hero actions become full-width targets;
- product filters use two columns, then one below `23rem`;
- product cards use the existing single-column catalogue layout;
- About and Services grids stack as complete cards;
- no horizontal carousel is used for essential content.

The production check must prove `document.body.scrollWidth` does not exceed the viewport width at 390px and 1440px.

## Token rules for interns

1. Use `--phekong-*` values from `src/styles/phekong-tokens.css`.
2. Do not add raw brand hex values in route CSS.
3. Use `--phekong-font-display` for editorial headings and `--phekong-font-sans` for interface copy.
4. Use the shared radius, spacing, border, focus, shadow, and motion tokens.
5. Check earth, ocean, botanical, and dark modes in Storybook before changing a shared rule.

## How to change a screen safely

1. Write the route's customer job in one sentence.
2. Decide which uncertainty the screen removes.
3. Reuse `CommerceRouteHero` for orientation.
4. Keep route-specific behaviour in its screen component.
5. Add or update the colocated unit test.
6. Add the important state to Storybook.
7. Check desktop 1440 and mobile 390 for overflow and clipped cards.
8. Keep `src/app/**/page.tsx` thin.

## Documentation consolidation

This file replaces route-by-route implementation commentary for Products, About, and Services. Do not create separate handoff documents containing the same folder map, token rules, or responsive contract. Route-specific business changes should be added to the relevant section here; shared system changes belong in `docs/design-system/README.md`.
