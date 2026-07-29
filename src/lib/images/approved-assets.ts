import manifest from "./approved-assets.json";

export type ApprovedImageAssetId =
  | "hero-reference"
  | "product-hair-oil"
  | "product-shea-butter"
  | "product-sugar-scrub"
  | "product-turmeric-soap";

export interface ApprovedImageAsset {
  id: ApprovedImageAssetId;
  file: string;
  src: string;
  width: number;
  height: number;
  format: "avif" | "jpeg" | "jpg" | "png" | "webp";
  bytes: number;
  sha256: string;
  alt: string;
  roles: ReadonlyArray<"shell-hero" | "home-story" | "product-card" | "product-detail">;
  repositoryCustodian: string;
  sourceCommit: string;
  sourceOwner: string;
  rightsStatus: "retain-existing-only";
}

export const approvedImageAssets = manifest.assets as ReadonlyArray<ApprovedImageAsset>;

const assetsById = new Map(approvedImageAssets.map((asset) => [asset.id, asset]));

export function getApprovedImageAsset(id: ApprovedImageAssetId) {
  const asset = assetsById.get(id);

  if (!asset) {
    throw new Error(`Approved image asset "${id}" is missing from the manifest.`);
  }

  return asset;
}

export const responsiveImageSizes = {
  shellHero: "(max-width: 760px) calc(100vw - 2rem), (max-width: 1120px) calc(100vw - 3rem), 55vw",
  homeStory: "(max-width: 900px) calc(100vw - 2rem), 50vw",
  productCard:
    "(max-width: 640px) calc(100vw - 2rem), (max-width: 980px) 45vw, (max-width: 1280px) 24vw, 220px",
  productDetail: "(max-width: 980px) calc(100vw - 2rem), 54vw",
} as const;
