export const routes = {
  home: "/",
  shop: "/shop",
  collections: "/collections",
  about: "/about",
  rituals: "/rituals",
  contact: "/contact",
  account: "/account",
  cart: "/cart",
  product: (slug: string) => `/products/${slug}`,
  productQuestion: "/contact?intent=product-question",
} as const;
