# Issue 23 Storybook Alignment

## Goal
Keep Storybook aligned with the live shell and catalogue surface so reviewers can inspect the same component families without duplicating page logic.

## Current alignment
- `src/components/shell/ApplicationShell.stories.tsx` renders the live shell at fullscreen and covers the `ready`, `loading`, `empty`, and `error` catalogue states.
- `src/components/catalogue/ProductCatalogue.stories.tsx` now also renders fullscreen so the section reads like the real page composition instead of a boxed widget.
- Both stories use the same live component code and the same `--phekong-*` token layer as the app.

## Review checklist
- Keep the shell story pointed at `ApplicationShell`, not a duplicate page wrapper.
- Use the catalogue story for component-state review, not for alternative layout experiments.
- Add only the smallest state coverage needed when new catalogue states or product cards change.
