# M1 Application Shell Architecture

## Purpose

The M1 public experience uses `ApplicationShell` as the shared frame for public pages. It owns the header, navigation, mobile menu, skip link, main landmark, footer, and reusable page-level states. Routes should mount the shell instead of rebuilding the same chrome.

## File Map

| Path | Role |
| --- | --- |
| `src/components/shell/ApplicationShell.tsx` | Single production landing-page component: shell, preferences, content sections, state laboratory, mobile navigation, and footer. |
| `src/components/shell/translations.ts` | Shell navigation labels, CTA text, and state-panel copy for supported locales. |
| `src/components/shell/application-shell.css` | Shell layout, header, footer, navigation, state-panel, and responsive mobile menu styling. |
| `src/components/shell/ApplicationShell.stories.tsx` | Storybook states for shell review outside the integrated route. |
| `src/app/page.tsx` | Live home route that mounts the shell for the public MVP page. |
| `src/app/page.test.tsx` | Route and shell interaction tests that protect live-app behaviour. |
| `src/styles/phekong-tokens.css` | Design tokens consumed by the shell CSS. |

## Data And Copy Flow

The home route is intentionally thin:

```tsx
return <ApplicationShell />;
```

The component owns the complete approved landing page. There is no parallel `TrainingLanding` page wrapper, so the live route, interaction state, and Storybook full-page story cannot drift between two implementations.

## State Model

`ApplicationShell` supports these page-level states:

| State | Use |
| --- | --- |
| `ready` | Normal state-panel story and default shell readiness copy. |
| `loading` | Loading state with busy landmark and spinner. |
| `empty` | Empty-but-valid page state. |
| `error` | Recoverable page-level error state. |

The landing page exposes these states through its state laboratory without replacing its production content.

## Navigation Behaviour

Desktop navigation is always visible above 900px. Below 900px, the shell hides desktop links and exposes the menu button. The button controls `mobile-navigation` with `aria-expanded` and closes the mobile menu when a mobile link is selected.

The test coverage now checks:

- the live home route uses the shell navigation
- the shell placeholder state panel does not replace the MVP content
- the mobile menu opens
- the active route is marked in mobile navigation
- selecting a mobile link closes the menu

## Storybook Relationship

Storybook is the isolated review surface for the shell states. The live app is the integrated route surface. Both should use the same `ApplicationShell` component so behaviour does not drift between documentation and production routes.

Current verification:

- `npm run test:run` runs route tests and Storybook browser tests.
- `npx storybook build --preview-only` verifies the Storybook preview/stories compile.
- `npm run build-storybook` still needs a follow-up for manager bundling in the restricted Windows context.

## Contributor Rules

1. Keep the home landing page in `ApplicationShell`; do not introduce a second page wrapper with duplicate header/footer chrome.
2. Give future routes their own route component and extract shared chrome only when a second production route actually requires it.
3. Add translations in `translations.ts` when shell-owned labels change.
4. Keep shell visual changes in `application-shell.css` and token values in `phekong-tokens.css`.
5. Update Storybook stories for new shell states or props.
6. Run `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build` before opening a PR.
