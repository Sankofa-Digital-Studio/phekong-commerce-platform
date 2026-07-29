# Route design documentation

Use this folder for the customer job, responsive contract, component map, and verification notes of live public routes.

```text
docs/design-system/routes/
├─ README.md                         # This index
├─ rituals.md                        # Guided ritual screen
├─ products-about-services.md        # Product, trust, and guided-service screens
├─ contact.md                        # Enquiry preparation and routing
└─ commerce.md                       # Cart, wishlist, and account preview states
```

## Primary navigation coverage

| Shell entry | Live surface | Route document |
| --- | --- | --- |
| Home | `ApplicationShell` plus `HomeExperience` | `../README.md` |
| Products | `ProductsScreen` | `products-about-services.md` |
| Rituals | `RitualsScreen` | `rituals.md` |
| Wellness | `HomeExperience#wellness` | `../README.md` |
| About | `AboutScreen` | `products-about-services.md` |
| Services | `ServicesScreen` | `products-about-services.md` |
| Contact | `ContactScreen` | `contact.md` |

## Reading order for interns

1. Read `../README.md` for the design-system source of truth.
2. Read the route document for the screen you are changing.
3. Open its colocated Storybook story.
4. Run its colocated unit test.
5. Verify mobile 390 and desktop 1440 before requesting review.

Do not add another document when the information fits one of the files above. Consolidate the existing file instead.
