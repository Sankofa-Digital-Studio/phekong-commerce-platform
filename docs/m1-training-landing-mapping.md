# M1 Training Landing: HTML-to-Tokens-to-Components Mapping

## Purpose

This note explains how the approved `Phekong_M1_Application_Shell_Vision_Themes_Bilingual.html` artifact became the public `/` route. It is written for interns who need to trace a design decision from a static HTML reference into the production React/Next implementation.

The conversion preserves the artifact's information architecture and visible copy. It does not ship the artifact as an iframe, inject its HTML, or duplicate a second application shell.

## Duplication Check

`main` already contained `ApplicationShell`, a starter token file, route tests, and Storybook stories. Those files were retained as the shared foundation and extended. The old `/` scaffold content was the missing part: it did not include the approved hero, shell anatomy, state laboratory, theme controls, bilingual copy, review checklist, or trust footer.

## Source-to-Production Map

| Approved HTML region | Token source | React/Next owner | Storybook evidence |
| --- | --- | --- | --- |
| `prototype-bar` and display controls | palette, mode, type, spacing, focus, motion tokens | `ApplicationShell` | `M1/Shell/ApplicationShell` |
| `site-header`, desktop nav, mobile drawer | header, surface, border, brand, header-height tokens | `ApplicationShell` | `M1/Shell/ApplicationShell` |
| `hero` and abstract `hero-visual` | visual A-D, shadow, radius, display type tokens | `TrainingHero` in `ApplicationShell.tsx` | `M1/Shell/ApplicationShell/Hero` |
| `shell-anatomy` cards | surface, border, card-shadow, radius tokens | `ShellAnatomy` in `ApplicationShell.tsx` | `M1/Shell/ApplicationShell/Anatomy` |
| `state-lab` and its four states | success, danger, surface, brand, motion tokens | `ShellStateLab` in `ApplicationShell.tsx` | `M1/Shell/ApplicationShell/StateLaboratory` |
| floating `review-panel` | accent-soft, surface, border, shadow tokens | `ReviewChecklist` | full landing story |
| trust footer | footer background/text/muted tokens | `ApplicationShell` | shell and full landing stories |
| inline `translations` object | no visual tokens; typed copy dictionaries | `shellCopy` and `trainingLandingCopy` | full landing interaction |
| inline event listeners and `localStorage` | no visual tokens; stable storage-key constants | React state and effects in `ApplicationShell` | route tests and full landing story |

## Token Rules

All theme colours, shadows, font families, page width, shared radii, focus treatment, and motion durations live in `src/styles/phekong-tokens.css` under the `--phekong-*` namespace. Component CSS may contain local geometry such as a grid ratio or a one-off icon size, but it must not introduce an untracked brand colour.

The document element carries two attributes:

```html
<html data-palette="earth" data-mode="light">
```

The supported palettes are `earth`, `ocean`, and `botanical`; supported modes are `light` and `dark`. React writes those attributes and persists the preference locally. No API, authenticated session, database, or server action is used.

## Component Boundaries

- `ApplicationShell` is the single production page component. It owns public chrome, preference state, landing-page composition, and the footer.
- `TrainingHero`, `ShellAnatomy`, `ShellStateLab`, and `ReviewChecklist` remain named sections in the same file so Storybook can review them independently without introducing a second page component.
- `src/app/page.tsx` remains a thin static route entrypoint.
- Copy is typed and centralised separately from JSX so English and Chinese cannot drift structurally.

## Intern Change Workflow

1. Find the source region in the mapping table.
2. Change a shared visual value in `phekong-tokens.css`, not in multiple components.
3. Change structure in the owning component and copy in the typed copy dictionary.
4. Update the nearest Storybook story when a reusable section or state changes.
5. Run `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build-storybook`, and `npm run build`.
6. Verify `/` at desktop and mobile widths, including the menu, palette, mode, language, and state controls.

## Static and Public Boundary

The route deliberately contains no checkout, authentication, booking, customer-account, or data-fetching logic. Future-route links remain visual prompts, matching the approved M1 artifact. Adding a real transaction or protected action requires its own authorised milestone and must not be hidden inside this landing page.
