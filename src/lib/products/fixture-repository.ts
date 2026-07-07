import type { ProductCatalogueItem } from "./types";

export const catalogueProducts = [
  {
    slug: "nourishing-shea-butter",
    category: "Body Butter",
    name: "Nourishing Shea Butter",
    description: "Rich, slow-melting moisture for dry skin and polished daily care rituals.",
    imageSrc: "/images/product-shea-butter.png",
    imageAlt: "A creamy shea butter jar on a stone pedestal with botanical leaves.",
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
    imageSrc: "/images/product-hair-oil.png",
    imageAlt: "An amber dropper bottle of hair oil on a stone pedestal with dried botanicals.",
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
    imageSrc: "/images/product-sugar-scrub.png",
    imageAlt: "A warm amber scrub jar with botanical accents on stone and wood.",
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
    imageSrc: "/images/product-turmeric-soap.png",
    imageAlt: "Stacked turmeric soap bars beside a kraft box with honey accents and leaves.",
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

