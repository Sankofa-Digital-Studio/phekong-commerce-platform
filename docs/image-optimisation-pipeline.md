# M1 image optimisation pipeline

## Purpose

This is the repeatable intake, rendering, and verification contract for M1
public-page images. It keeps image rights explicit, sends responsive modern
formats through `next/image`, reserves layout space before download, and gives
interns one safe preparation path.

## Current ownership and source inventory

All five public raster assets entered the repository in commit
`202dbf98fab4b6b059a0ea5b777d57aeb8303fe4`, authored by
`Sankofa-Digital-XCIV`. Git history establishes repository custody, not
copyright ownership. No licence, release, purchase receipt, or original-source
record is present in the repository, so every existing asset is classified
`retain-existing-only`.

| Asset ID | Source | Intrinsic size | Bytes | Current roles | Ownership decision |
| --- | --- | ---: | ---: | --- | --- |
| `hero-reference` | `phekong-hero-reference.png` | 830 × 620 | 671,979 | Shell hero, home story | Retain; do not redistribute |
| `product-hair-oil` | `product-hair-oil.png` | 290 × 150 | 69,137 | Hero, card, detail | Retain; request a higher-resolution approved master |
| `product-shea-butter` | `product-shea-butter.png` | 290 × 150 | 69,744 | Hero, card, detail | Retain; request a higher-resolution approved master |
| `product-sugar-scrub` | `product-sugar-scrub.png` | 288 × 150 | 67,795 | Hero, card, detail | Retain; request a higher-resolution approved master |
| `product-turmeric-soap` | `product-turmeric-soap.png` | 300 × 150 | 68,440 | Hero, card, detail | Retain; request a higher-resolution approved master |

The machine-readable inventory, including SHA-256 checksums and exact source
commit, lives in
`src/lib/images/approved-assets.json`. A replacement must not be added until an
approver records the creator or supplier, intended rights, and approval
evidence in the pull request.

## Rendering contracts

| Surface | Reserved layout | Browser `sizes` contract | Loading | Quality |
| --- | --- | --- | --- | ---: |
| Shell hero | Existing responsive hero container | Full mobile/tablet width, 55vw desktop | LCP eager | 75 |
| Home story | Intrinsic 830:620 ratio | Full mobile width, 50vw desktop | Lazy | 75 |
| Product card | Existing card aspect-ratio | Full mobile, 45vw tablet, 24vw compact desktop, 220px wide desktop | Featured eager; remainder lazy | 75 |
| Product detail | Existing bounded media container | Full width below 980px, 54vw desktop | LCP eager | 75 |

Every image uses its real source width and height. CSS may crop with
`object-fit: cover`, but code must never invent square intrinsic dimensions.
The container aspect ratio or minimum height reserves the final space and
prevents avoidable layout shift. `ApprovedImage` retains that space and shows
an accessible, asset-free fallback if download fails.

`next.config.mjs` enables AVIF first and WebP second. A supporting browser gets
the smallest negotiated modern format; other browsers retain a compatible
source response. The approved source files are not duplicated merely to claim
another extension.

## Preparing a new approved image

1. Obtain written approval and record the creator or supplier, rights granted,
   approver, and evidence link in the pull request. Stop if any field is
   missing.
2. Start with the largest authentic master. Do not upscale the current small
   product references.
3. Crop deliberately for the intended role before running automation:
   hero/story should normally be 4:3; product cards and details need an
   approved master of at least 1200px on the shortest displayed axis.
4. Name files in lowercase kebab-case:
   `hero-<subject>-<view>.<ext>` or `product-<slug>-<view>.<ext>`.
5. Prefer WebP quality 78 for photographic sources. Use AVIF quality 55 when a
   reviewed browser fallback exists, JPEG quality 82 for an approved legacy
   need, PNG only for required transparency, and SVG only for reviewed
   first-party vector artwork.
6. Run the preparation command. It strips metadata, applies EXIF rotation,
   keeps aspect ratio, refuses enlargement, and will not overwrite unless
   `--force` is explicitly supplied:

   ```powershell
   npm run images:prepare -- --input=C:\approved\master.tif --output=public/images/product-example-front.webp --width=1600 --height=1600
   ```

7. Copy the printed dimensions, byte count, format, and SHA-256 into
   `approved-assets.json`; add meaningful alt text and the rights record.
8. Reference the registered asset through `getApprovedImageAsset`, render it
   with `ApprovedImage`, and choose one exported responsive `sizes` contract.
9. Run `npm run images:check`, the focused unit tests, Storybook tests/build,
   and the production build. Attach before/after response bytes and 390px /
   1440px screenshots to the draft PR.

## Naming, compression, and rejection rules

- Reject spaces, underscores, uppercase names, version suffixes such as
  `final-final`, and unexplained numeric copies.
- Reject new stock, scraped, AI-generated, or supplier images without written
  approval and rights evidence.
- Reject files outside `public/images`, missing alt text, invented intrinsic
  dimensions, missing responsive `sizes`, or a checksum that differs from the
  inventory.
- Keep one approved source per visual. Let the Next image optimiser negotiate
  AVIF/WebP instead of committing duplicate PNG/WebP/AVIF copies.
- Re-run `npm run images:check` after any byte-level change. A changed checksum
  requires human review; it is never updated silently.

## Verification and troubleshooting

`npm run images:check` fails for a missing file, path or naming drift,
dimension/format/byte/checksum mismatch, an ownership overclaim, or missing
AVIF/WebP configuration. A failure is a review signal, not an instruction to
rewrite the manifest until it passes.

If an image fails in the browser, verify the manifest path and Next build log
first. `ApprovedImage` then exposes a text fallback without adding an
unapproved replacement. If a product source looks soft, request a new approved
master; do not upscale it.
