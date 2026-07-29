import { describe, expect, it } from "vitest";
import {
  approvedImageAssets,
  getApprovedImageAsset,
  responsiveImageSizes,
} from "./approved-assets";

describe("approved image assets", () => {
  it("keeps stable, unique identifiers and public paths", () => {
    expect(new Set(approvedImageAssets.map((asset) => asset.id)).size).toBe(approvedImageAssets.length);
    expect(new Set(approvedImageAssets.map((asset) => asset.src)).size).toBe(approvedImageAssets.length);

    for (const asset of approvedImageAssets) {
      expect(asset.file).toMatch(/^public\/images\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:avif|jpe?g|png|webp)$/);
      expect(asset.src).toBe(asset.file.replace(/^public/, ""));
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.alt.trim().length).toBeGreaterThan(12);
      expect(asset.rightsStatus).toBe("retain-existing-only");
    }
  });

  it("resolves every registered asset and declares responsive browser hints", () => {
    for (const asset of approvedImageAssets) {
      expect(getApprovedImageAsset(asset.id)).toBe(asset);
    }

    for (const sizes of Object.values(responsiveImageSizes)) {
      expect(sizes).toContain("vw");
      expect(sizes).toContain("max-width");
    }
  });
});
