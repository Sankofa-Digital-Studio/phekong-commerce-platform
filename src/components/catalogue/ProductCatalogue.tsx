"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import "./product-catalogue.css";

export type ProductCatalogueState = "ready" | "loading" | "empty" | "error";

export interface ProductCatalogueItem {
  slug: string;
  name: string;
  description: string;
  priceCents: number;
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
    slug: "restorative-body-oil",
    name: "Restorative Body Oil",
    description: "A warm botanical blend for daily self-care routines and gift-ready shelves.",
    priceCents: 125000,
    stockQuantity: 18,
    lowStockThreshold: 5,
    active: true,
  },
  {
    slug: "calming-foot-soak",
    name: "Calming Foot Soak",
    description: "A compact staple that keeps the catalogue grounded with an easy repeat purchase.",
    priceCents: 68000,
    stockQuantity: 4,
    lowStockThreshold: 5,
    active: true,
  },
  {
    slug: "botanical-room-mist",
    name: "Botanical Room Mist",
    description: "A light scent layer for reception counters, treatment rooms, and home use.",
    priceCents: 54000,
    stockQuantity: 0,
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
  if (product.stockQuantity === 0) {
    return ["Out of stock", "product-card__status--out"] as const;
  }

  if (product.stockQuantity <= product.lowStockThreshold) {
    return ["Low stock", "product-card__status--low"] as const;
  }

  return ["In stock", "product-card__status--ready"] as const;
}

function getActionLabel(product: ProductCatalogueItem) {
  if (product.stockQuantity === 0) {
    return "Request restock";
  }

  if (product.stockQuantity <= product.lowStockThreshold) {
    return "Ask about stock";
  }

  return "Ask about product";
}

function ProductCatalogueReady({
  products,
}: {
  products: ReadonlyArray<ProductCatalogueItem>;
}) {
  return (
    <div className="product-catalogue__grid" aria-label="Active products">
      {products.map((product) => {
        const [availability, availabilityClassName] = getAvailabilityLabel(product);

        return (
          <article className="product-card" key={product.slug}>
            <span className={`product-card__status ${availabilityClassName}`}>{availability}</span>
            <h3>{product.name}</h3>
            <p className="product-card__description">{product.description}</p>
            <div className="product-card__footer">
              <div>
                <strong className="product-card__price">{formatCurrency(product.priceCents)}</strong>
                <span className="product-card__meta">
                  {product.stockQuantity} in stock | Low stock at {product.lowStockThreshold}
                </span>
              </div>
              <Button
                size="medium"
                variant="secondary"
                type="button"
                onClick={() => {
                  window.location.hash = "#contact";
                }}
              >
                {getActionLabel(product)}
              </Button>
            </div>
          </article>
        );
      })}
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
        {Array.from({ length: 3 }).map((_, index) => (
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
  const lowStockCount = activeProducts.filter(
    (product) => product.stockQuantity > 0 && product.stockQuantity <= product.lowStockThreshold,
  ).length;
  const outOfStockCount = activeProducts.filter((product) => product.stockQuantity === 0).length;
  const visibleState = state === "ready" && activeProducts.length === 0 ? "empty" : state;

  return (
    <section className="product-catalogue" id="products" aria-labelledby="product-catalogue-title">
      <div className="product-catalogue__header">
        <p className="product-catalogue__eyebrow">Product catalogue</p>
        <div className="product-catalogue__lead">
          <div>
            <h2 id="product-catalogue-title">Browse active products at a glance</h2>
            <p className="product-catalogue__intro">
              Read-only product browsing stays responsive on mobile and desktop, while loading,
              empty, and error states keep the public journey clear.
            </p>
          </div>

          {visibleState === "ready" ? (
            <dl className="product-catalogue__stats" aria-label="Catalogue summary">
              <div>
                <dt>Active products</dt>
                <dd>{activeProducts.length}</dd>
              </div>
              <div>
                <dt>Low stock alerts</dt>
                <dd>{lowStockCount}</dd>
              </div>
              <div>
                <dt>Out of stock</dt>
                <dd>{outOfStockCount}</dd>
              </div>
            </dl>
          ) : null}
        </div>
      </div>

      {visibleState === "loading" ? <LoadingCatalogue /> : null}
      {visibleState === "empty" ? <EmptyCatalogue onRetry={onRetry} /> : null}
      {visibleState === "error" ? <ErrorCatalogue onRetry={onRetry} /> : null}
      {visibleState === "ready" ? <ProductCatalogueReady products={activeProducts} /> : null}
    </section>
  );
}
