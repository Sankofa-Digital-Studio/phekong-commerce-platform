import { describe, expect, it } from "vitest";
import { catalogueProducts } from "./fixture-repository";
import { formatCurrency, getProductAvailability, isValidProductSlug, resolveProductBySlug } from "./repository";

describe("product repository helpers", () => {
  it("validates approved product slugs", () => {
    expect(isValidProductSlug("nourishing-shea-butter")).toBe(true);
    expect(isValidProductSlug("Nourishing Shea Butter")).toBe(false);
    expect(isValidProductSlug("")).toBe(false);
    expect(isValidProductSlug("growth--strength")).toBe(false);
  });

  it("derives stock semantics from the read model", () => {
    expect(getProductAvailability(catalogueProducts[0]).label).toBe("In stock");
    expect(getProductAvailability(catalogueProducts[1]).label).toBe("Low stock");
    expect(getProductAvailability(catalogueProducts[2]).label).toBe("Out of stock");
  });

  it("formats prices in the approved currency", () => {
    expect(formatCurrency(26000)).toContain("R");
  });

  it("falls back to the fixture repository when live data is unavailable", async () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    try {
      const product = await resolveProductBySlug("nourishing-shea-butter");

      expect(product?.source).toBe("fixture");
      expect(product?.fallbackReason).toBe("live-unavailable");
      expect(product?.product.slug).toBe("nourishing-shea-butter");
    } finally {
      process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
    }
  });
});
