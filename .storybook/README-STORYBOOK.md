# Phekong Storybook workflow

**Sankofa Digital proprietary and confidential. Not for distribution.**

Storybook is the isolated implementation and review environment for Phekong frontend components.

## Authority chain

- Penpot approves design intent and token decisions.
- Storybook proves implemented component states, responsiveness, interaction and accessibility.
- The Next.js application proves integrated route behaviour.

## Commands

```text
npm run storybook
npm run test-storybook
npm run build-storybook
npm run storybook:ci
```

`storybook:ci` runs Storybook browser tests followed by the full static build. CI installs Chromium before running component tests.

## Shared application configuration

- `.storybook/preview.ts` imports `src/app/globals.css` and `src/styles/phekong-tokens.css`.
- Components use the approved `--phekong-*` token namespace and shared font stacks.
- TypeScript resolves `@/*` from `src/*`; the Next.js/Vite Storybook framework consumes the same alias.
- Viewport presets are `Mobile 390` (390 x 844) and `Desktop 1440` (1440 x 900).
- Accessibility checks use `@storybook/addon-a11y` and fail browser tests on violations.

## Penpot handoff

Open the **M1 / Workflow / Penpot to Storybook** documentation page in Storybook for the contributor checklist. Review components at both approved viewports and verify keyboard focus before requesting review.

## Scope boundary

Stories contain no authentication, booking, cart, checkout, payment, database, production environment or deployment-secret logic.
