# Commerce Route UI Contract

This document consolidates the frontend-only M2 commerce preview and the dedicated cart, wishlist, and account screens.

## Customer jobs

| Route | Customer job | Current boundary |
| --- | --- | --- |
| `/commerce` | Preview the intended transaction flow and visual hierarchy. | Concept preview; no persistence or payment provider. |
| `/cart` | Review quantities and understand a transparent order summary. | Totals are local preview state; server-side pricing and checkout are not connected. |
| `/wishlist` | Review saved products, remove them, and recover from an empty list. | Saved state does not persist. |
| `/account` | Understand optional account benefits and future sign-in choices. | Authentication and customer profile storage are not connected. |

## Reusable components

- `CommerceScreen` owns the responsive layout for `cart`, `wishlist`, and `account` variants.
- `SiteFooter` owns discover, support, and shopping navigation plus an honest checkout status.
- `CommercePreview` remains the earlier `/commerce` concept and is not duplicated inside the dedicated screens.
- Small private helpers keep headings, quantity controls, summary rows, empty states, and benefit rows consistent inside `CommerceScreen`.

## Interaction and accessibility

- Quantity controls use product-specific accessible names.
- Status feedback uses the shared live-region component.
- Wishlist removal ends in a useful empty recovery state.
- Account and checkout actions state when authentication or payment is unavailable.
- Phone layouts use one content column and preserve the same reading order as desktop.

## Storybook and tests

- `M2/Commerce/CommerceScreen`: cart, wishlist, and account stories.
- `M2/Shell/SiteFooter`: default and localized-label stories.
- Component tests cover total recalculation, wishlist recovery, account boundaries, and footer navigation.

## Backend relationship

The visual screens do not claim persistence, authentication, server-side price validation, order creation, or payment capture. Those responsibilities remain in `docs/m2-commerce-contract.md` and its linked M2 issues.
