import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { ProductCatalogue } from "@/components/catalogue/ProductCatalogue";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description: "Approved public products for Phekong Wellness Centre.",
  alternates: {
    canonical: buildCanonicalUrl("/products"),
  },
};

export default function ProductsPage() {
  return (
    <ApplicationShell activeRoute="products" showStatePanel={false}>
      <section id="products" aria-labelledby="products-heading">
        <h1 id="products-heading" className="visually-hidden">
          Approved public products
        </h1>
        <ProductCatalogue state="ready" />
      </section>
    </ApplicationShell>
  );
}
