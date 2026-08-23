import { beforeEach, describe, expect, it, vi } from "vitest";
import { catalogueProducts } from "@/lib/products/fixture-repository";

const resolveProductBySlugMock = vi.fn();

vi.mock("@/lib/products/repository", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/products/repository")>();

  return {
    ...original,
    resolveProductBySlug: resolveProductBySlugMock,
  };
});

describe("product detail metadata", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps a descriptive title when live data falls back to the approved fixture", async () => {
    const fixtureProduct = catalogueProducts.find(
      (product) => product.slug === "nourishing-shea-butter",
    );

    expect(fixtureProduct).toBeDefined();
    resolveProductBySlugMock.mockResolvedValue({
      product: fixtureProduct,
      source: "fixture",
      fallbackReason: "live-unavailable",
    });

    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "nourishing-shea-butter" }),
    });

    expect(metadata.title).toBe(fixtureProduct?.name);
    expect(metadata.title).not.toBe("");
    expect(metadata.description).toBe(fixtureProduct?.description);
  });
});
