"use client";

import { useState } from "react";
import { ProductCatalogue } from "@/components/catalogue/ProductCatalogue";
import { catalogueProducts } from "@/lib/products/fixture-repository";
import { CommerceRouteHero } from "./CommerceRouteHero";
import { CommerceSectionHeading } from "./CommerceSectionHeading";
import "./products-screen.css";
import "./products-catalogue-theme.css";

type ProductFilter = "all" | "body" | "hair" | "cleansing";

const filters = [
  { id: "all", label: "All essentials" },
  { id: "body", label: "Body care" },
  { id: "hair", label: "Hair care" },
  { id: "cleansing", label: "Cleansing" },
] as const satisfies ReadonlyArray<{ id: ProductFilter; label: string }>;

function matchesFilter(category: string, filter: ProductFilter) {
  if (filter === "all") return true;
  if (filter === "body") return category === "Body Butter" || category === "Body Scrub";
  if (filter === "hair") return category === "Hair Oil";
  return category === "Handmade Soap";
}

export interface ProductsScreenProps {
  initialFilter?: ProductFilter;
}

export function ProductsScreen({ initialFilter = "all" }: ProductsScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<ProductFilter>(initialFilter);
  const visibleProducts = catalogueProducts.filter((product) => product.active && matchesFilter(product.category, selectedFilter));

  return (
    <div className="commerce-screen products-screen">
      <CommerceRouteHero
        pageLabel="Products"
        eyebrow="The Phekong collection"
        title="Find the care that fits your day."
        description="Browse a focused collection by the kind of care you need. Every card keeps price, availability, and the next action visible so choosing feels simple—not rushed."
        primaryAction={{ href: "#product-finder", label: "Explore the collection" }}
        secondaryAction={{ href: "/rituals", label: "Start with a ritual" }}
        proofPoints={["Clear availability", "Prices in rand", "Save for later"]}
        visualKicker="A simple shopping rhythm"
        visualTitle="Need. Compare. Choose."
        visualSteps={["Pick a care category", "Compare complete cards", "Open product details"]}
        tone="gold"
      />

      <section className="commerce-screen__section product-finder" id="product-finder" aria-labelledby="product-finder-title">
        <CommerceSectionHeading
          eyebrow="Shop by care need"
          title="Start broad, then narrow the shelf."
          description="The filter changes the complete product grid below. Nothing is hidden off-screen in a horizontal carousel, and every mobile card remains fully visible."
          id="product-finder-title"
        />
        <fieldset className="product-filter">
          <legend className="visually-hidden">Filter the product collection</legend>
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selectedFilter === filter.id}
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </fieldset>
        <p className="product-filter__count" aria-live="polite">
          Showing {visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}
        </p>
        <ProductCatalogue key={selectedFilter} products={visibleProducts} />
      </section>

      <section className="commerce-screen__section shopping-confidence" aria-labelledby="shopping-confidence-title">
        <CommerceSectionHeading
          eyebrow="Shop with confidence"
          title="Useful information before pressure."
          description="A good catalogue makes the decision easier before it asks for commitment. These are the promises the interface can genuinely keep today."
          id="shopping-confidence-title"
        />
        <div className="shopping-confidence__grid">
          <article><span>01</span><h3>Availability stays visible</h3><p>Low-stock and unavailable items remain clearly labelled instead of becoming frustrating dead ends.</p></article>
          <article><span>02</span><h3>Details are one clear step away</h3><p>Each product name and card visual leads to a dedicated detail route for closer comparison.</p></article>
          <article><span>03</span><h3>Guidance is optional</h3><p>Shoppers who prefer a smaller starting point can move into a ritual instead of browsing every item.</p></article>
        </div>
      </section>
    </div>
  );
}
