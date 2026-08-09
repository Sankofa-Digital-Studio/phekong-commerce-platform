# Frontend media scan and usage plan

**Status:** local review asset pack; not connected to the live frontend.  
**Source:** shared Google Drive folder supplied by the product owner.  
**Branch:** `sankofa_xciv/feature-media-scan-frontend`

## Decision summary

Three JPEG frames were selected from the paired JPEG/CR2 shoot. The edits are deterministic: EXIF orientation correction, modest contrast/colour balancing, responsive crops, and presentation on warm/sage studio panels. Product pixels and label artwork remain unchanged. An AI background concept was tested but rejected because it distorted small label text.

## Screen assignments

| Screen | Edited asset | Source | Role | Recommended treatment |
|---|---|---|---|---|
| Homepage / collection landing | `edited/home-collection-hero-aloe-puree.jpg` | `IMG_0077.JPG` | Primary campaign hero | 16:9; bottle right; left side reserved for copy and CTA |
| Product detail | `edited/product-detail-aloe-puree.jpg` | `IMG_0081.JPG` | Main gallery image | Square; neutral sage surround; use `object-fit: contain` |
| Product listing / editorial tile | `edited/catalogue-card-herbal-therapy.jpg` | `IMG_0068.JPG` | Product card or category story | 4:5; strong mobile crop; label remains central |

## Frontend usage contract

- Keep source masters outside `public/`; only approved derivatives should be promoted later.
- Before production use, confirm product names, sizes, claims, ownership/consent, and alt text with the catalogue owner.
- Proposed alt text: “Large bottle of Aloe Puree complementary supplement”; “Compact bottle of Aloe Puree complementary supplement”; “Bottle of Herbal Therapy herbal tea”.
- Serve responsive AVIF/WebP variants at roughly 480, 768, 1200, and 1600 px; retain JPEG as fallback.
- Do not place text over labels. Hero copy belongs in the reserved negative-space area.

## Three-pass critique

1. **Selection pass:** chose frames with the clearest silhouette, legible hero product name, and distinct screen utility; rejected near-duplicates.
2. **Usability pass:** corrected orientation and created aspect ratios for desktop and mobile without altering label pixels.
3. **Risk pass:** AI recreation was rejected for label fidelity; production promotion remains gated by product-data and rights confirmation.

## Not selected

`IMG_0050.JPG`, `IMG_0039.JPG`, and `IMG_0034.JPG` were retained only as scan references because the local downloads showed lower reliability or duplicated the selected visual roles.
