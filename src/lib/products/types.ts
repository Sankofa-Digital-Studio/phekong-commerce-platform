import type { ApprovedImageAssetId } from "@/lib/images/approved-assets";

export type ProductSource = "fixture" | "live";

export type ProductAvailability = "in-stock" | "low-stock" | "out-of-stock";

export interface ProductCatalogueItem {
  slug: string;
  category: string;
  name: string;
  description: string;
  imageAssetId: ApprovedImageAssetId;
  priceCents: number;
  rating: number;
  stockQuantity: number;
  lowStockThreshold: number;
  active: boolean;
}

export interface ProductResolution {
  product: ProductCatalogueItem;
  source: ProductSource;
  fallbackReason?: "live-unavailable" | "live-missing";
}

export interface ProductLiveRow {
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
  active: boolean;
  stock_quantity: number;
  low_stock_threshold: number;
}

