# Prototype Content Bank

This note captures reusable content extracted from the uploaded prototype archive.

## Decision

Use the prototype as a content and merchandising reference only.

- Reuse: product naming direction, wellness categories, imagery, trust copy, and page messaging.
- Do not reuse: the prototype Firebase client code, DOM-driven rendering, or sessionStorage-based state.

The live repo already has a stronger App Router shell and a real backend baseline, so the right path is to blend the prototype's content direction into the existing implementation.

## Extracted content

| Area | Prototype evidence | Reusable value | Repo fit |
| --- | --- | --- | --- |
| Homepage categories | Healing Herbal Teas, Fresh Herbal Juices, Therapy Lab, Beauty Lab, Food Cures, Massage Therapy | Strong commerce taxonomy for navigation and hero sections | Fits the current shell and catalogue experience |
| Brand story | Holistic wellness through natural healing, traditional wisdom, and modern care | Good trust statement for hero/footer/about copy | Fits public route copy and SEO snippets |
| About page | Established in 2006, based in Welkom, Free State, wellness and community focus | Brand origin and local identity | Fits the About page and footer trust language |
| Contact page | WhatsApp/phone/contact-first journey, Welkom location | Contact CTA structure | Fits the Contact route and sticky CTA placement |
| FAQ page | Massage expectations, booking lead time, natural ingredients, wellness uses | Strong conversion support content | Fits FAQ and product/support sections |
| Profile page | Edit profile, order history, massage bookings | Useful for optional account preview UI | Fits future account UI only, not required for shopping |
| Checkout flow | Cart empty state, order placed, checkout confirmation, massage booking confirmation | Good UI states for transaction previews | Fits the current visual commerce shell |
| Wishlist flow | Wishlist sidebar, add/remove/move-to-cart interactions | Good engagement pattern for shopping intent | Fits the new wishlist preview surface |

## Extracted image inventory

| Image file | Likely use |
| --- | --- |
| `logo8.png` / `Logo8.png` | Brand mark / header logo |
| `about-us.gif` | About page hero or story panel |
| `Aloe Puree.jpeg` | Juice category or hero product |
| `Ginger herbal Tea.png` | Tea category |
| `Ginger Lemonade.png` | Refreshment / juice category |
| `Lengana.jpeg` | Tea category |
| `Capsicum supplement.jpeg` | Supplement / wellness category |
| `zero fat belly tea.png` | Wellness tea concept, but wording should be compliance-checked before use |
| `Cancer tea.jpg` | Reference only, not suitable for direct marketing copy without legal/compliance review |
| `mouth wash.jpeg` | Oral care category |
| `Herbal therapy gel.png` | Therapy / topical care category |
| `Facial scrub.png` | Skin care / face care |
| `Face creme.jfif` | Face care |
| `shea butter.jpg` | Body care / moisturizer |
| `Chocolate bar.jpg` | Food cure / snack concept |
| `superfood supplements.png` | Supplements / nutrition |
| `Full body.jpg` | Massage / treatment experience |
| `half body massage.jpg` | Massage / treatment experience |
| `feet massage.jpg` | Massage / treatment experience |

## Extracted price signals

| Source | Values observed | Note |
| --- | --- | --- |
| Profile page | `R349.99`, `R249.99`, `R149.99`, `R200.00`, `R400.00` | Useful as price-band anchors only |
| Checkout page | `R0.00`, `R100.00` | Useful for empty-state and fee/extra placeholders |

## Extracted copy worth reusing

| Section | Original intent | Recommended live reuse |
| --- | --- | --- |
| Homepage hero | Wellness categories and direct discovery | Convert into category-first landing blocks |
| About | Origin, mission, community impact | Use as trust and brand story content |
| FAQ | Education, expectations, reassurance | Use to reduce purchase friction |
| Contact | Fast assistance and location clarity | Use as a conversion support section |

## Compliance note

Some prototype phrases reference sensitive wellness claims. Keep the live copy compliant and avoid unverified promises, especially for claims around disease treatment or guaranteed results.

## Recommended implementation path

1. Keep the current live backend and App Router structure.
2. Reframe the homepage and catalogue using the prototype's wellness taxonomy.
3. Use the extracted images as visual references only after licensing/origin is confirmed.
4. Keep the wishlist and profile surfaces as optional engagement layers, not shopping blockers.

