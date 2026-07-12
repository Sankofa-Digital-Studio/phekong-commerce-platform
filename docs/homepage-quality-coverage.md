# Adaptive Homepage Quality Coverage

> **Sankofa Digital Proprietary and Confidential — Not for Distribution**

Status: Active
Owner: Sankofa Digital Lead
Source branch: `dev`

## Purpose

This document records the automated and manual evidence required before the adaptive Phekong homepage moves from `dev` to `preview`, and then to `main`.

## Behaviour contract

- The ritual welcome is CSS-only, dismissible, and short-lived.
- The hero carousel advances automatically only when motion and data preferences allow it.
- Hover, keyboard focus, Data Saver, reduced motion, and hidden tabs pause enhanced motion.
- Manual previous, next, and dot controls remain keyboard accessible.
- `Begin your ritual` and `Find your ritual` lead to `#shop-by-need`.
- The hero image must load with a non-zero natural width.
- Data Saver persists in `localStorage` under `phekong-data-saver`.
- No `aria-hidden="true"` element may contain a focusable descendant.

## Automated layers

| Layer | Command | Coverage |
| --- | --- | --- |
| Unit/component | `npm run test:run` | Welcome lifecycle, autoplay, manual navigation, Data Saver persistence, CTA/accessibility contract |
| Storybook interaction | `npm run test-storybook` | Full shell rendering and isolated adaptive controls |
| Storybook build | `npm run build-storybook` | Static story compilation and asset integration |
| Cypress smoke | `npm run test:e2e:cypress` | Real-browser hero image, CTA anchors, carousel, persistence, ARIA focus safety |
| Production build | `npm run build` | Next.js compilation, TypeScript and route generation |

## Promotion gate

1. Develop and run focused checks on `dev`.
2. Run lint, typecheck, unit/component tests, Storybook tests/build, Cypress smoke, and the Next.js build.
3. Promote the verified commit to `preview`.
4. Review the stable Vercel Preview alias on desktop and mobile, including Data Saver and reduced motion.
5. Promote the same commit to `main` only after Preview acceptance.

## Manual Preview checklist

- Confirm the hero image fills the visual panel without a blank region.
- Confirm the loader does not trap keyboard focus and “Enter now” works.
- Confirm autoplay is smooth and pauses on hover/focus.
- Confirm Data Saver survives refresh and removes enhanced motion.
- Test at 360 px, 768 px, 1024 px and 1366 px widths.
- Run the Vercel accessibility scan and confirm no hidden-focusable violations.
- Check heading hierarchy, canonical URL, page title and meta description.

## Living Ritual homepage contract

- The homepage begins with four customer-feeling choices and no automatic carousel or artificial blocking loader.
- Ritual state is shareable through ?ritual=restore|ground|care|renew and restored from session storage without overriding a new user choice.
- Each choice reveals three wellness-oriented steps and maps to an existing catalogue slug; no medical or unsupported social-proof claims are introduced.
- Product stock and save controls occupy separate corners, with save controls sized to 44 by 44 pixels.
- Storybook covers unselected, four ritual states, mobile and desktop; axe must report no serious accessibility violations.
- Cypress verifies the restoring journey, session persistence, 320-pixel horizontal overflow, control sizing and hidden-focus safety.
- Manual screenshot inspection remains a required preview acceptance gate when the local browser surface is available.
