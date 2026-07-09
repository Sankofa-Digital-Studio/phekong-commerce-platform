import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { ProductCatalogue } from "@/components/catalogue/ProductCatalogue";
import { PublicRouteSurface } from "@/components/routes/PublicRouteSurface";
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
      <PublicRouteSurface
        eyebrow="Products"
        title="Approved public products"
        description="Browse handcrafted body and hair care essentials, each anchored to the read-only public catalogue."
        summary="The route is live, the catalogue is reusable, and product detail pages resolve from approved slugs."
        actions={[
          { kind: "link", label: "Explore rituals", href: "/rituals", variant: "primary" },
          { kind: "link", label: "Contact about a product", href: "/contact", variant: "secondary" },
          {
            kind: "button",
            label: "Refresh catalogue preview",
            variant: "ghost",
            loadingLabel: "Refreshing catalogue preview...",
            successMessage: "Catalogue preview is up to date.",
          },
        ]}
      >
        <div aria-labelledby="products-heading">
          <h2 id="products-heading" className="visually-hidden">
            Approved public products
          </h2>
          <ProductCatalogue state="ready" />
        </div>
      </PublicRouteSurface>
    </ApplicationShell>
  );
}
