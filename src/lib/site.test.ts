import { afterEach, describe, expect, it, vi } from "vitest";
import { buildCanonicalUrl, buildPublicSitemapEntries, getRobotsMeta, getSiteOrigin } from "./site";

describe("site SEO helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("falls back to localhost outside production", () => {
    expect(getSiteOrigin()).toBe("http://localhost:3000");
    expect(buildCanonicalUrl("/products/nourishing-shea-butter")).toBe(
      "http://localhost:3000/products/nourishing-shea-butter",
    );
    expect(getRobotsMeta()).toEqual({ index: false, follow: false });
    expect(buildPublicSitemapEntries(["nourishing-shea-butter"])).toEqual([]);
  });

  it("uses the configured production origin for canonicals and sitemap entries", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://phekong.example");
    vi.stubEnv("VERCEL_ENV", "production");

    expect(getSiteOrigin()).toBe("https://phekong.example");
    expect(buildCanonicalUrl("/")).toBe("https://phekong.example/");
    expect(getRobotsMeta()).toEqual({ index: true, follow: true });
    expect(buildPublicSitemapEntries(["nourishing-shea-butter", "turmeric-honey-soap"])).toEqual([
      "https://phekong.example/",
      "https://phekong.example/products/nourishing-shea-butter",
      "https://phekong.example/products/turmeric-honey-soap",
    ]);
  });
});
