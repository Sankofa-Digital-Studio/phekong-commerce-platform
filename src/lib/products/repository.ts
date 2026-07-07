import { cache } from "react";
import { catalogueProducts, getCatalogueProductBySlug } from "./fixture-repository";
import type {
  ProductCatalogueItem,
  ProductLiveRow,
  ProductResolution,
  ProductAvailability,
} from "./types";

const productSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function createSupabaseProductReader() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  );

  return {
    async findBySlug(slug: string) {
      const { data, error } = await client
        .from("products")
        .select("slug,name,description,price_cents,active,stock_quantity,low_stock_threshold")
        .eq("slug", slug)
        .maybeSingle<ProductLiveRow>();

      if (error || !data) {
        return null;
      }

      return data;
    },
  };
}

function mergeLiveRowWithFixture(liveRow: ProductLiveRow, fixtureProduct: ProductCatalogueItem) {
  return {
    ...fixtureProduct,
    name: liveRow.name,
    description: liveRow.description ?? fixtureProduct.description,
    priceCents: liveRow.price_cents,
    active: liveRow.active,
    stockQuantity: liveRow.stock_quantity,
    lowStockThreshold: liveRow.low_stock_threshold,
  } satisfies ProductCatalogueItem;
}

export function isValidProductSlug(value: string) {
  return productSlugPattern.test(value);
}

export function formatCurrency(priceCents: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

export function getProductAvailability(product: Pick<ProductCatalogueItem, "stockQuantity" | "lowStockThreshold">) {
  if (product.stockQuantity === 0) {
    return {
      label: "Out of stock",
      tone: "out-of-stock",
      message: "This approved product is currently unavailable.",
    } as const satisfies {
      label: string;
      tone: ProductAvailability;
      message: string;
    };
  }

  if (product.stockQuantity <= product.lowStockThreshold) {
    return {
      label: "Low stock",
      tone: "low-stock",
      message: "This product is selling through its current batch.",
    } as const satisfies {
      label: string;
      tone: ProductAvailability;
      message: string;
    };
  }

  return {
    label: "In stock",
    tone: "in-stock",
    message: "This product is ready to ship.",
  } as const satisfies {
    label: string;
    tone: ProductAvailability;
    message: string;
  };
}

const readLiveProduct = cache(async (slug: string) => {
  const reader = await createSupabaseProductReader();

  if (!reader) {
    return null;
  }

  return reader.findBySlug(slug);
});

export async function resolveProductBySlug(slug: string): Promise<ProductResolution | null> {
  if (!isValidProductSlug(slug)) {
    return null;
  }

  const fixtureProduct = getCatalogueProductBySlug(slug);
  if (!fixtureProduct) {
    return null;
  }

  const liveProduct = await readLiveProduct(slug);
  if (liveProduct) {
    return {
      product: mergeLiveRowWithFixture(liveProduct, fixtureProduct),
      source: "live",
    };
  }

  return {
    product: fixtureProduct,
    source: "fixture",
    fallbackReason: "live-unavailable",
  };
}

export { catalogueProducts };
