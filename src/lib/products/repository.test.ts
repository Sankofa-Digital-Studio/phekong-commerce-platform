import { beforeEach, describe, expect, it, vi } from "vitest";
import { catalogueProducts } from "./fixture-repository";

const createClientMock = vi.fn();

vi.mock("@supabase/supabase-js", () => ({
  createClient: createClientMock,
}));

describe("product repository helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });
  it("validates approved product slugs", async () => {
    const { isValidProductSlug } = await import("./repository");

    expect(isValidProductSlug("nourishing-shea-butter")).toBe(true);
    expect(isValidProductSlug("Nourishing Shea Butter")).toBe(false);
    expect(isValidProductSlug("")).toBe(false);
    expect(isValidProductSlug("growth--strength")).toBe(false);
  });

  it("derives stock semantics from the read model", async () => {
    const { getProductAvailability } = await import("./repository");
    expect(getProductAvailability(catalogueProducts[0]).label).toBe("In stock");
    expect(getProductAvailability(catalogueProducts[1]).label).toBe("Low stock");
    expect(getProductAvailability(catalogueProducts[2]).label).toBe("Out of stock");
  });

  it("formats prices in the approved currency", async () => {
    const { formatCurrency } = await import("./repository");

    expect(formatCurrency(26000)).toContain("R");
  });

  it("falls back to the fixture repository when live data is unavailable", async () => {
    const { resolveProductBySlug } = await import("./repository");
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

  it("returns null when the live source is configured but the row is filtered or missing", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "public-anon-key";
    createClientMock.mockReturnValue({
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            maybeSingle: vi.fn(async () => ({ data: null, error: null })),
          })),
        })),
      })),
    });

    const { resolveProductBySlug } = await import("./repository");

    await expect(resolveProductBySlug("nourishing-shea-butter")).resolves.toBeNull();
  });
});
