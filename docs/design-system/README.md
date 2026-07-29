# Phekong Design System

This folder is the practical guide for designing and implementing Phekong customer-facing screens. It is written for interns first: start here, follow the file map, and use the route checklist before opening a pull request.

## Folder map

```text
docs/design-system/
├── README.md                         # Shared rules, ownership, and contributor workflow
└── routes/
    ├── README.md                     # Primary-navigation coverage index
    ├── rituals.md                    # Guided ritual screen
    ├── products-about-services.md    # Discovery, trust, and guided-help screens
    ├── contact.md                    # Enquiry preparation and routing
    └── commerce.md                   # Cart, wishlist, and account preview contract

src/
├── app/                              # Thin Next.js route entry points and metadata
├── components/
│   ├── shell/                        # Header, navigation, adaptive home hero, and footer
│   ├── home/                         # Home/Wellness story and shop-by-need cards
│   ├── navigation/                   # Products, About, Services, Contact, and shared route primitives
│   ├── rituals/                      # Rituals screen, styles, tests, and stories
│   └── ui/                           # Reusable primitives
└── styles/
    └── phekong-tokens.css            # Palette, spacing, radius, shadow, and motion tokens
```

Tests and stories stay beside the component they cover. Avoid barrel files and route-specific `types.ts` files unless a type is genuinely shared.

## Sources of truth

| Concern | Source | Rule |
| --- | --- | --- |
| Public shell | `src/components/shell/ApplicationShell.tsx` | Extend the live shell; do not mirror changes into training artifacts. |
| Design values | `src/styles/phekong-tokens.css` | Use `--phekong-*` variables before adding local values. |
| Route composition | `src/app/<route>/page.tsx` | Keep route files thin: metadata plus the route component. |
| Primary route map | `routes/README.md` | Update this when navigation or route ownership changes. |
| Isolated visual states | `*.stories.tsx` beside the component | Add the smallest stories that explain meaningful states or interactions. |
| Behavior proof | `*.test.tsx` beside the component | Test shopper-visible behavior, accessibility names, and honest boundaries. |

## Shared public-route rules

1. Give every screen one primary customer job. If the screen cannot be explained in one sentence, simplify it.
2. Use the shared shell, route-specific metadata, and a canonical URL.
3. Use a visible page title and breadcrumb when the route sits below the home page.
4. Design phone, tablet, and desktop compositions intentionally. Cards must reflow; they must not be clipped or depend on horizontal scrolling.
5. Do not claim medical results, working checkout, account persistence, live inventory, submission handling, or contact delivery unless the connected system proves it.
6. Include useful loading, empty, unavailable, and recovery states when the route owns them.
7. Keep the main action visible and specific. Secondary actions should help comparison or recovery, not compete with the main action.
8. Preserve keyboard navigation, visible focus, semantic headings, and a 44-pixel minimum target for controls.

## Intern workflow

1. Read the relevant file under `routes/`.
2. Write the screen's customer job before writing JSX.
3. Sketch the content order at 360px first, then widen it for tablet and desktop.
4. Map every colour, spacing, radius, shadow, and motion value to `--phekong-*` tokens.
5. Build the route in a dedicated component and keep `page.tsx` thin.
6. Add a default Storybook story plus stories for meaningful alternate states.
7. Add focused component tests for the primary action and an honest failure or unavailable boundary.
8. Run focused tests, Storybook build, production build, and rendered mobile/desktop checks.

## Documentation consolidation audit

| Previous document | Decision | Reason |
| --- | --- | --- |
| `docs/m2-commerce-preview-handoff.md` | Removed; consolidated into `routes/commerce.md` | It repeated the newer commerce screen boundary. |
| `docs/m2-commerce-screen-system.md` | Removed; consolidated into `routes/commerce.md` | It described the same frontend-only route family and components. |
| `docs/public-route-uiux-handoff.md` | Removed; consolidated here | Its mobile, breadcrumb, metadata, and honesty rules are shared rules. |
| `docs/prototype-content-bank.md` | Removed after live-route promotion | Its route advice is now implemented, its contact suggestion was unverified, and its compliance rule is preserved here and in route docs. |
| `docs/m2-commerce-contract.md` | Keep | It is a backend transaction contract, not a UI handoff. |
| `docs/m2-foundation-baseline.md` | Keep | It records database and row-level security foundations. |
| `docs/m2-m4-public-roadmap.md` | Keep | It maps milestone work and issue ownership. |
| `docs/homepage-quality-coverage.md` | Keep | It is the distinct homepage verification and promotion gate. |
| `docs/issue-23-*.md` | Keep as historical evidence | These record the original catalogue issue, implementation, and Storybook alignment. |
| `docs/m1-*.md` and `docs/intern/*.md` | Keep | These are milestone, onboarding, and training records rather than current route specifications. |

When a future document repeats a shared rule, update this README and link to it. Do not create another handoff note for the same concern.
