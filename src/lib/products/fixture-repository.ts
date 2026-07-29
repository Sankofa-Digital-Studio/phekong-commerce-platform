import type { ProductCatalogueItem } from "./types";
import { getApprovedImageAsset } from "@/lib/images/approved-assets";

const sheaButterImage = getApprovedImageAsset("product-shea-butter");
const hairOilImage = getApprovedImageAsset("product-hair-oil");
const sugarScrubImage = getApprovedImageAsset("product-sugar-scrub");
const turmericSoapImage = getApprovedImageAsset("product-turmeric-soap");

export const catalogueProducts = [
  {
    slug: "nourishing-shea-butter",
    category: "Body Butter",
    name: "Nourishing Shea Butter",
    description: "Rich, slow-melting moisture for dry skin and polished daily care rituals.",
    imageAssetId: sheaButterImage.id,
    priceCents: 26000,
    rating: 4.8,
    stockQuantity: 18,
    lowStockThreshold: 5,
    active: true,
  },
  {
    slug: "growth-strength-oil",
    category: "Hair Oil",
    name: "Growth & Strength Oil",
    description: "A concentrated leave-in formula with a warm finish and a premium shelf presence.",
    imageAssetId: hairOilImage.id,
    priceCents: 28000,
    rating: 4.7,
    stockQuantity: 4,
    lowStockThreshold: 5,
    active: true,
  },
  {
    slug: "exfoliating-sugar-scrub",
    category: "Body Scrub",
    name: "Exfoliating Sugar Scrub",
    description: "A tactile polish that reads luxurious, warm, and immediately giftable.",
    imageAssetId: sugarScrubImage.id,
    priceCents: 24000,
    rating: 4.9,
    stockQuantity: 0,
    lowStockThreshold: 5,
    active: true,
  },
  {
    slug: "turmeric-honey-soap",
    category: "Handmade Soap",
    name: "Turmeric & Honey Soap",
    description: "A crafted everyday essential with an earthy golden tone and clean finish.",
    imageAssetId: turmericSoapImage.id,
    priceCents: 9000,
    rating: 4.8,
    stockQuantity: 12,
    lowStockThreshold: 5,
    active: true,
  },
] as const satisfies ReadonlyArray<ProductCatalogueItem>;

export function getCatalogueProductBySlug(slug: string) {
  return catalogueProducts.find((product) => product.slug === slug) ?? null;
}

