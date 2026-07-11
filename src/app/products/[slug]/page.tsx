import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { ProductDetail } from "@/components/products/ProductDetail";
import { resolveProductBySlug, isValidProductSlug } from "@/lib/products/repository";
import { buildCanonicalUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isValidProductSlug(slug)) {
    return {
      title: "Product not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const resolution = await resolveProductBySlug(slug);

  if (!resolution) {
    return {
      title: "Product not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: resolution.product.name,
    description: resolution.product.description,
    alternates: {
      canonical: buildCanonicalUrl(`/products/${slug}`),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isValidProductSlug(slug)) {
    notFound();
  }

  const resolution = await resolveProductBySlug(slug);

  if (!resolution) {
    notFound();
  }

  return (
    <ApplicationShell activeRoute="products" showStatePanel={false}>
      <ProductDetail
        product={resolution.product}
        source={resolution.source}
        fallbackReason={resolution.fallbackReason}
      />
    </ApplicationShell>
  );
}
