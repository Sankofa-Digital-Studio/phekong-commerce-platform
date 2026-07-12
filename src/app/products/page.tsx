import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { ProductCatalogue } from "@/components/catalogue/ProductCatalogue";
import { PublicRouteSurface } from "@/components/routes/PublicRouteSurface";
import { buildCanonicalUrl } from "@/lib/site";
import { wellnessThemeContent } from "@/components/ui/objects/wellnessThemeContent";
import shared from "@/components/routes/route-page.module.css";

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
        title="Natural wellness categories that are easy to scan and easy to trust."
        description="The live store now mirrors the prototype&apos;s stronger merchandising language: teas, juices, body care, oral care, energy, calm, and massage support, all presented through the existing catalogue."
        summary="Use this route to browse approved products, compare intent-based categories, and move toward a product detail page without guessing what is live."
        actions={[
          { kind: "link", label: "Shop by need", href: "#category-grid", variant: "primary" },
          { kind: "link", label: "Contact about a product", href: "/contact", variant: "secondary" },
          { kind: "link", label: "Wishlist preview", href: "/wishlist", variant: "ghost" },
        ]}
      >
        <section className={shared.section} aria-labelledby="category-grid">
          <div>
            <h2 className={shared.sectionTitle} id="category-grid">
              Shop by wellness need
            </h2>
            <p className={shared.sectionLead}>
              The prototype&apos;s strongest idea was category-first discovery. The live catalogue now leans into that same approach while keeping the approved product list and existing backend baseline intact.
            </p>
          </div>

          <div className={shared.panelGrid}>
            {wellnessThemeContent.categories.map((category) => (
              <Link key={category.title} className={shared.panel} href={category.href}>
                <h3 className={shared.panelTitle}>{category.title}</h3>
                <p className={shared.panelText}>{category.copy}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={shared.section} aria-labelledby="products-story">
          <div>
            <h2 className={shared.sectionTitle} id="products-story">
              Why the live product page converts better now
            </h2>
            <p className={shared.sectionLead}>
              The page keeps the live product catalogue, but now frames it with the prototype&apos;s natural-wellness story: South African origin, clear intent, and a calmer path to the right item.
            </p>
          </div>

          <div className={shared.timeline}>
            <article className={shared.timelineItem}>
              <div className={shared.timelineIndex}>1</div>
              <div className={shared.timelineBody}>
                <h3 className={shared.timelineTitle}>Intent before inventory</h3>
                <p className={shared.timelineText}>Visitors can see which problem each product family supports before they start scanning prices.</p>
              </div>
            </article>
            <article className={shared.timelineItem}>
              <div className={shared.timelineIndex}>2</div>
              <div className={shared.timelineBody}>
                <h3 className={shared.timelineTitle}>Proof before pressure</h3>
                <p className={shared.timelineText}>Trust notes, origin language, and a reusable catalogue surface reduce friction without making unsupported health claims.</p>
              </div>
            </article>
            <article className={shared.timelineItem}>
              <div className={shared.timelineIndex}>3</div>
              <div className={shared.timelineBody}>
                <h3 className={shared.timelineTitle}>Path to action</h3>
                <p className={shared.timelineText}>Cart preview, wishlist preview, and product detail pages now stay visually consistent with the same brand system.</p>
              </div>
            </article>
          </div>
        </section>

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
