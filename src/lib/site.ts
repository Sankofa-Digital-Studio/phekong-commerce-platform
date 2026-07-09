import type { Metadata } from "next";
import { catalogueProducts } from "@/lib/products/fixture-repository";

const localOrigin = "http://localhost:3000";

function toOrigin(value: string) {
  try {
    return new URL(value.includes("://") ? value : `https://${value}`).origin;
  } catch {
    return null;
  }
}

export function isProductionDeployment() {
  return process.env.VERCEL_ENV === "production";
}

export function getSiteOrigin() {
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicitSiteUrl) {
    const origin = toOrigin(explicitSiteUrl);
    if (origin) {
      return origin;
    }
  }

  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionUrl) {
    const origin = toOrigin(productionUrl);
    if (origin) {
      return origin;
    }
  }

  const previewUrl = process.env.VERCEL_URL?.trim();
  if (isProductionDeployment() && previewUrl) {
    const origin = toOrigin(previewUrl);
    if (origin) {
      return origin;
    }
  }

  return localOrigin;
}

export function buildCanonicalUrl(pathname: string) {
  return new URL(pathname, getSiteOrigin()).toString();
}

export function getRobotsMeta(): Metadata["robots"] {
  return isProductionDeployment() ? { index: true, follow: true } : { index: false, follow: false };
}

export function buildPublicSitemapEntries(slugs: ReadonlyArray<string>) {
  if (!isProductionDeployment()) {
    return [];
  }

  return ["/", ...slugs.map((slug) => `/products/${slug}`)].map((pathname) => buildCanonicalUrl(pathname));
}

export function getApprovedProductSlugs() {
  return catalogueProducts.map((product) => product.slug);
}
