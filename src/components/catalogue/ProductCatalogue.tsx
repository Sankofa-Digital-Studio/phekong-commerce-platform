"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ActionFeedback, type FeedbackState } from "@/components/ui/ActionFeedback";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getProductAvailability } from "@/lib/products/repository";
import "./product-catalogue.css";

export type ProductCatalogueState = "ready" | "loading" | "empty" | "error";

export interface ProductCatalogueItem {
  slug: string;
  category: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  priceCents: number;
  rating: number;
  stockQuantity: number;
  lowStockThreshold: number;
  active: boolean;
}

export interface ProductCatalogueProps {
  state?: ProductCatalogueState;
  products?: ReadonlyArray<ProductCatalogueItem>;
  onRetry?: () => void;
}

export const catalogueProducts: ReadonlyArray<ProductCatalogueItem> = [
  {
    slug: "nourishing-shea-butter",
    category: "Body Butter",
    name: "Nourishing Shea Butter",
    description: "Rich, slow-melting moisture for dry skin and polished daily care rituals.",
    imageSrc: "/images/product-shea-butter.png",
    imageAlt: "A creamy shea butter jar on a stone pedestal with botanical leaves.",
    priceCents: 26000,
    rating: 4.8,
    stockQuantity: 18,
    lowStockThreshold: 5,
    active: true,
  },
  {
    slug: "growth-strength-oil",
    category: "Hair Oil",
    name: "Growth & Strength Oil",
    description: "A concentrated leave-in formula with a warm finish and a premium shelf presence.",
    imageSrc: "/images/product-hair-oil.png",
    imageAlt: "An amber dropper bottle of hair oil on a stone pedestal with dried botanicals.",
    priceCents: 28000,
    rating: 4.7,
    stockQuantity: 4,
    lowStockThreshold: 5,
    active: true,
  },
  {
    slug: "exfoliating-sugar-scrub",
    category: "Body Scrub",
    name: "Exfoliating Sugar Scrub",
    description: "A tactile polish that reads luxurious, warm, and immediately giftable.",
    imageSrc: "/images/product-sugar-scrub.png",
    imageAlt: "A warm amber scrub jar with botanical accents on stone and wood.",
    priceCents: 24000,
    rating: 4.9,
    stockQuantity: 0,
    lowStockThreshold: 5,
    active: true,
  },
  {
    slug: "turmeric-honey-soap",
    category: "Handmade Soap",
    name: "Turmeric & Honey Soap",
    description: "A crafted everyday essential with an earthy golden tone and clean finish.",
    imageSrc: "/images/product-turmeric-soap.png",
    imageAlt: "Stacked turmeric soap bars beside a kraft box with honey accents and leaves.",
    priceCents: 9000,
    rating: 4.8,
    stockQuantity: 12,
    lowStockThreshold: 5,
    active: true,
  },
] as const;

function formatCurrency(priceCents: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}

function getAvailabilityLabel(product: ProductCatalogueItem) {
  const availability = getProductAvailability(product);
  return [availability.label, `product-card__status--${availability.tone}`] as const;
}

function ProductCatalogueReady({
  products,
  onFavorite,
  onNext,
  savedSlugs,
  featuredSlug,
  busySlug,
}: {
  products: ReadonlyArray<ProductCatalogueItem>;
  onFavorite: (product: ProductCatalogueItem) => void;
  onNext: () => void;
  savedSlugs: Set<string>;
  featuredSlug: string;
  busySlug: string | null;
}) {
  return (
    <div className="product-catalogue__ready">
      <aside className="product-catalogue__intro" aria-labelledby="collection-title">
        <p className="product-catalogue__eyebrow">Our collection</p>
        <h2 id="collection-title">Care for your ritual, daily.</h2>
        <p>
          Explore handcrafted essentials for body, hair, and soul. Each piece is built to read
          premium at a glance and stay clear on smaller screens.
        </p>
        <Link className="phekong-button phekong-button-ghost phekong-button-medium" href="/products">
          View all products
        </Link>
      </aside>

      <div className="product-catalogue__carousel">
        <div className="product-catalogue__grid" aria-label="Featured products">
          {products.map((product) => {
            const [availability, availabilityClassName] = getAvailabilityLabel(product);
            const isSaved = savedSlugs.has(product.slug);
            const isFeatured = product.slug === featuredSlug;
            const isBusy = busySlug === product.slug;

            return (
              <article className={`product-card ${isFeatured ? "product-card--featured" : ""}`.trim()} key={product.slug}>
                <div className="product-card__media">
                  <Link
                    className="product-card__media-link"
                    href={`/products/${product.slug}`}
                    aria-label={`Open ${product.name}`}
                  >
                    <Image
                      className="product-card__image"
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      width={720}
                      height={720}
                      loading={isFeatured ? "eager" : "lazy"}
                    />
                  </Link>
                  <span className={`product-card__status ${availabilityClassName}`}>{availability}</span>
                  <button
                    className={`product-card__favorite ${isSaved ? "product-card__favorite--saved" : ""}`.trim()}
                    type="button"
                    aria-label={isSaved ? `Remove ${product.name} from saved items` : `Save ${product.name}`}
                    aria-pressed={isSaved}
                    aria-busy={isBusy}
                    onClick={() => onFavorite(product)}
                  >
                    <HeartIcon />
                  </button>
                </div>
                <div className="product-card__content">
                  <p className="product-card__category">{product.category}</p>
                  <h3>
                    <Link
                      className="product-card__title-link"
                      href={`/products/${product.slug}`}
                      aria-label={`View details for ${product.name}`}
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <div className="product-card__footer">
                    <strong className="product-card__price">{formatCurrency(product.priceCents)}</strong>
                    <span className="product-card__rating">
                      <StarIcon /> {product.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button className="product-catalogue__next" type="button" aria-label="Next featured product" onClick={onNext}>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

function LoadingCatalogue() {
  return (
    <div className="product-catalogue__state" aria-busy="true" aria-live="polite">
      <div className="product-catalogue__loading-copy">
        <span className="product-catalogue__spinner" aria-hidden="true" />
        <div>
          <h3>Loading active products</h3>
          <p>The public catalogue is resolving and will appear once the current batch is ready.</p>
        </div>
      </div>
      <div className="product-catalogue__loading-grid" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="product-catalogue__loading-card" key={index}>
            <span className="product-catalogue__skeleton product-catalogue__skeleton-chip" />
            <span className="product-catalogue__skeleton product-catalogue__skeleton-title" />
            <span className="product-catalogue__skeleton product-catalogue__skeleton-line" />
            <span className="product-catalogue__skeleton product-catalogue__skeleton-line" />
            <span className="product-catalogue__skeleton product-catalogue__skeleton-button" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyCatalogue({ onRetry }: { onRetry?: () => void }) {
  return (
    <Card
      className="product-catalogue__state-card"
      eyebrow="Empty catalogue"
      title="No active products are available"
      tone="accent"
      footer={
        <Button
          size="medium"
          variant="secondary"
          type="button"
          disabled={!onRetry}
          onClick={onRetry}
        >
          Reload catalogue
        </Button>
      }
    >
      <p>
        The read-only catalogue is ready, but nothing is currently visible for this state.
        Clear the filter or load approved products to restore the grid.
      </p>
    </Card>
  );
}

function ErrorCatalogue({ onRetry }: { onRetry?: () => void }) {
  return (
    <Card
      className="product-catalogue__state-card"
      eyebrow="Recoverable error"
      title="The catalogue could not be loaded"
      footer={
        <Button
          size="medium"
          variant="secondary"
          type="button"
          disabled={!onRetry}
          onClick={onRetry}
        >
          Try again
        </Button>
      }
    >
      <p>
        The shell stays usable and the public product journey remains safe. Retry the
        catalogue once the data source is available again.
      </p>
    </Card>
  );
}

export function ProductCatalogue({
  state = "ready",
  products = catalogueProducts,
  onRetry,
}: ProductCatalogueProps) {
  const activeProducts = products.filter((product) => product.active);
  const visibleState = state === "ready" && activeProducts.length === 0 ? "empty" : state;
  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());
  const [featuredSlug, setFeaturedSlug] = useState(activeProducts[0]?.slug ?? products[0]?.slug ?? "");
  const [busySlug, setBusySlug] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => setFeedback(null), feedback.tone === "loading" ? 900 : 2200);
    return () => window.clearTimeout(timeout);
  }, [feedback]);


  function announce(nextFeedback: FeedbackState) {
    setFeedback(nextFeedback);
  }

  async function saveProduct(product: ProductCatalogueItem) {
    if (busySlug) {
      return;
    }

    setBusySlug(product.slug);
    announce({ tone: "loading", message: `Saving ${product.name}...` });

    try {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 280));
      setSavedSlugs((current) => {
        const next = new Set(current);
        if (next.has(product.slug)) {
          next.delete(product.slug);
          announce({ tone: "success", message: `${product.name} removed from saved items.` });
        } else {
          next.add(product.slug);
          announce({ tone: "success", message: `${product.name} saved for later.` });
        }
        return next;
      });
    } catch {
      announce({ tone: "error", message: `Could not update saved items for ${product.name}.` });
    } finally {
      setBusySlug(null);
    }
  }

  async function goToNextFeatured() {
    if (activeProducts.length === 0) {
      announce({ tone: "blocked", message: "No active products are available to feature." });
      return;
    }

    announce({ tone: "loading", message: "Moving to the next featured product..." });
    await new Promise<void>((resolve) => window.setTimeout(resolve, 220));

    const currentIndex = activeProducts.findIndex((product) => product.slug === featuredSlug);
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % activeProducts.length;
    const nextProduct = activeProducts[nextIndex];
    setFeaturedSlug(nextProduct.slug);
    announce({ tone: "success", message: `Featured ${nextProduct.name}.` });
  }

  return (
    <section className="product-catalogue" id="products" aria-labelledby="product-catalogue-title">
      <div className="product-catalogue__header">
        <p className="product-catalogue__eyebrow">Product catalogue</p>
        <div className="product-catalogue__lead">
          <div>
            <h2 id="product-catalogue-title">Choose the ritual your day is asking for</h2>
            <p className="product-catalogue__lede">
              Read-only browsing stays responsive on mobile and desktop while loading, empty, and
              error states keep the public journey clear.
            </p>
          </div>
        </div>
      </div>

      <ActionFeedback state={feedback} />

      {visibleState === "loading" ? <LoadingCatalogue /> : null}
      {visibleState === "empty" ? <EmptyCatalogue onRetry={onRetry} /> : null}
      {visibleState === "error" ? <ErrorCatalogue onRetry={onRetry} /> : null}
      {visibleState === "ready" ? (
        <ProductCatalogueReady
          products={activeProducts}
          onFavorite={saveProduct}
          onNext={goToNextFeatured}
          savedSlugs={savedSlugs}
          featuredSlug={featuredSlug}
          busySlug={busySlug}
        />
      ) : null}
    </section>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20.25 10.6 19c-4.2-3.8-6.95-6.28-6.95-9.32A4.68 4.68 0 0 1 8.35 5c1.45 0 2.82.7 3.65 1.8A4.63 4.63 0 0 1 15.65 5a4.68 4.68 0 0 1 4.7 4.68c0 3.04-2.75 5.52-6.95 9.32L12 20.25Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.93 5.93 6.55.95-4.74 4.62 1.12 6.53L12 17.95 6.14 21.03l1.12-6.53L2.52 9.88l6.55-.95L12 3Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 4.5 20.5 12 13 19.5l-1.42-1.42 5.08-5.08H3.5v-2h13.16l-5.08-5.08L13 4.5Z" />
    </svg>
  );
}

