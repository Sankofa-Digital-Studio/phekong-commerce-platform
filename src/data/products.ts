export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  stockStatus: StockStatus;
  image: string;
  shortDescription: string;
};

export const products: Product[] = [
  {
    id: "restorative-body-oil",
    slug: "restorative-body-oil",
    name: "Restorative Body Oil",
    category: "Body",
    price: 249.0,
    rating: 4.8,
    stockStatus: "in-stock",
    image: "/images/restorative-body-oil.jpg",
    shortDescription: "A nourishing blend with marula, baobab and vitamin E.",
  },
  {
    id: "nourishing-shea-butter",
    slug: "nourishing-shea-butter",
    name: "Nourishing Shea Butter",
    category: "Body",
    price: 199.0,
    rating: 4.6,
    stockStatus: "low-stock",
    image: "/images/nourishing-shea-butter.jpg",
    shortDescription: "Rich body butter for daily moisture and skin comfort.",
  },
  {
    id: "growth-strength-oil",
    slug: "growth-strength-oil",
    name: "Growth & Strength Oil",
    category: "Hair",
    price: 179.0,
    rating: 4.7,
    stockStatus: "in-stock",
    image: "/images/growth-strength-oil.jpg",
    shortDescription: "Lightweight oil for scalp care and stronger hair rituals.",
  },
];

export const featuredProducts = products.slice(0, 3);
