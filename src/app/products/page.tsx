import type { Metadata } from "next";
import { ProductsScreen } from "@/components/navigation/ProductsScreen";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Phekong wellness products by care need with clear prices and availability.",
  alternates: { canonical: buildCanonicalUrl("/products") },
};

export default function ProductsPage() {
  return (
    <ApplicationShell activeRoute="products" showStatePanel={false}>
      <ProductsScreen />
    </ApplicationShell>
  );
}
