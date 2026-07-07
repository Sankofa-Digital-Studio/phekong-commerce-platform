import type { MetadataRoute } from "next";
import { buildPublicSitemapEntries, getApprovedProductSlugs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildPublicSitemapEntries(getApprovedProductSlugs()).map((url) => ({
    url,
    lastModified: new Date(),
  }));
}
