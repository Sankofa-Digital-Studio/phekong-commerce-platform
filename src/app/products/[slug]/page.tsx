import { notFound } from "next/navigation";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { ProductDetail } from "@/components/products/ProductDetail";
import { resolveProductBySlug, isValidProductSlug } from "@/lib/products/repository";

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

