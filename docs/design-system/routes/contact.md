# Contact screen

## Customer job

The Contact route turns uncertainty into a well-routed enquiry. It must help a shopper explain what they need without claiming that a message was delivered when no approved public email, phone, WhatsApp, or server submission channel exists in the repository.

## Folder map

```text
src/
├─ app/contact/page.tsx
└─ components/navigation/
   ├─ ContactScreen.tsx
   ├─ contact-screen.css
   ├─ ContactScreen.test.tsx
   └─ ContactScreen.stories.tsx
```

The screen also reuses:

```text
src/components/navigation/
├─ CommerceRouteHero.tsx
├─ CommerceSectionHeading.tsx
└─ commerce-route-hero.css
```

## Conversion flow

1. Choose an enquiry topic.
2. Add name, future reply email, optional reference, and useful context.
3. Review the complete summary.
4. Copy the summary for an approved channel when one becomes available.

The action says **Review enquiry**, never **Send**. Copying the summary is also explicitly described as not sending it.

## Topic mapping

| Incoming query value | Contact topic |
| --- | --- |
| `product-guidance` | Product guidance |
| `ritual-planning` | Ritual support |
| `recovery-support` | Service enquiry |
| `order` | Order support |
| Missing or unknown | General enquiry |

## Safety and privacy

The screen tells users not to include:

- passwords;
- payment-card numbers;
- identity documents;
- private medical records.

The planner is browser-local React state. It does not call an API, write to Supabase, or persist the enquiry.

## Mobile contract

At phone width:

- topic cards stack into one column;
- inputs stack into one column;
- review details stack into one column;
- action buttons become full width;
- route cards remain complete and use no horizontal carousel.

## Intern change checklist

1. Do not add a contact destination until it is approved and present in environment or site configuration.
2. Keep the route entry thin; interactive state belongs in `ContactScreen`.
3. Preserve the unsent wording until a real backend action is implemented and tested.
4. Add tests for any new topic mapping.
5. Add a Storybook state for any new meaningful interaction.
6. Verify 390px and 1440px with zero horizontal overflow.
