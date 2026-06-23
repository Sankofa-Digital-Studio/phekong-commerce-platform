# Phekong Storybook bootstrap

**Sankofa Digital proprietary and confidential. Not for distribution.**

This pack converts the approved M1 shell concept into a reviewable Storybook foundation.

## Integration

1. Copy `.storybook`, `src/styles`, and `src/components` into the repository.
2. Merge the scripts and devDependencies from `package.storybook.json` into `package.json`.
3. Run `npm install`.
4. Run `npm run storybook`.
5. Run `npm run build-storybook` before opening the pull request.

## Authority chain

- Penpot approves design intent.
- Storybook proves component states and accessibility.
- The application proves integrated route behaviour.
- Figma may be used as a visual reference only.

## Initial review

Verify all three palettes, light/dark mode, English/Chinese copy, 390px mobile viewport, 1440px desktop viewport, keyboard navigation, focus visibility, loading, empty and error states.

## Scope boundary

This pack contains no authentication, booking, cart, checkout, payment, database or production environment logic.
