"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Image from "next/image";
import { catalogueProducts } from "@/lib/products/fixture-repository";
import { formatCurrency, getProductAvailability } from "@/lib/products/repository";
import type { ProductCatalogueItem } from "@/lib/products/types";
import "./product-catalogue.css";

export type ProductCatalogueState = "ready" | "loading" | "empty" | "error";

export interface ProductCatalogueProps {
  state?: ProductCatalogueState;
  products?: ReadonlyArray<ProductCatalogueItem>;
  onRetry?: () => void;
}

function ProductCatalogueReady({
  products,
}: {
  products: ReadonlyArray<ProductCatalogueItem>;
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
        <Button
          size="medium"
          variant="ghost"
          type="button"
          onClick={() => {
            window.location.hash = "#contact";
          }}
        >
          View all products
        </Button>
      </aside>

      <div className="product-catalogue__carousel">
        <div className="product-catalogue__grid" aria-label="Featured products">
          {products.map((product) => {
            const availability = getProductAvailability(product);

            return (
              <article className="product-card" key={product.slug}>
                <div className="product-card__media">
                  <Image
                    className="product-card__image"
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    width={720}
                    height={720}
                    loading="eager"
                  />
                  <span className={`product-card__status product-card__status--${availability.tone}`}>
                    {availability.label}
                  </span>
                  <button className="product-card__favorite" type="button" aria-label={`Save ${product.name}`}>
                    <HeartIcon />
                  </button>
                </div>
                <div className="product-card__content">
                  <p className="product-card__category">{product.category}</p>
                  <h3>{product.name}</h3>
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

        <button className="product-catalogue__next" type="button" aria-label="Next products">
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

  return (
    <section className="product-catalogue" id="products" aria-labelledby="product-catalogue-title">
      <div className="product-catalogue__header">
        <p className="product-catalogue__eyebrow">Product catalogue</p>
        <div className="product-catalogue__lead">
          <div>
            <h2 id="product-catalogue-title">Featured essentials for the page</h2>
            <p className="product-catalogue__lede">
              Read-only browsing stays responsive on mobile and desktop while loading, empty, and
              error states keep the public journey clear.
            </p>
          </div>
        </div>
      </div>

      {visibleState === "loading" ? <LoadingCatalogue /> : null}
      {visibleState === "empty" ? <EmptyCatalogue onRetry={onRetry} /> : null}
      {visibleState === "error" ? <ErrorCatalogue onRetry={onRetry} /> : null}
      {visibleState === "ready" ? <ProductCatalogueReady products={activeProducts} /> : null}
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
