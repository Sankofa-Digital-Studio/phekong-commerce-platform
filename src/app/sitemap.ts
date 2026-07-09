import type { MetadataRoute } from "next";
import { catalogueProducts } from "@/lib/products/fixture-repository";
import { buildCanonicalUrl, isProductionDeployment } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionDeployment()) {
    return [];
  }

  return [
    "/",
    "/products",
    "/about",
    "/services",
    "/contact",
    ...catalogueProducts.map((product) => "/products/" + product.slug),
  ].map((pathname) => ({
    url: buildCanonicalUrl(pathname),
    lastModified: new Date(),
  }));
}
