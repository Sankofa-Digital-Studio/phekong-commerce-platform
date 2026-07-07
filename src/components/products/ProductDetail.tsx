"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency, getProductAvailability } from "@/lib/products/repository";
import type { ProductCatalogueItem, ProductResolution } from "@/lib/products/types";
import "./product-detail.css";

export interface ProductDetailProps {
  product: ProductCatalogueItem;
  source: ProductResolution["source"];
  fallbackReason?: ProductResolution["fallbackReason"];
}

export function ProductDetail({ product, source, fallbackReason }: ProductDetailProps) {
  const availability = getProductAvailability(product);

  return (
    <article className="product-detail">
      <section className="product-detail__hero">
        <div className="product-detail__media">
          <Image
            className="product-detail__image"
            src={product.imageSrc}
            alt={product.imageAlt}
            width={1280}
            height={1280}
            priority
          />
          <span className={`product-detail__status product-detail__status--${availability.tone}`}>
            {availability.label}
          </span>
        </div>

        <div className="product-detail__copy">
          <p className="product-detail__eyebrow">Product detail</p>
          <h1>{product.name}</h1>
          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__meta">
            <span>{product.category}</span>
            <span>{formatCurrency(product.priceCents)}</span>
            <span>{availability.message}</span>
          </div>

          <div className="product-detail__actions">
            <Button size="medium" variant="primary" type="button" disabled={availability.tone === "out-of-stock"}>
              {availability.tone === "out-of-stock" ? "Unavailable" : "Add to cart"}
            </Button>
            <Link className="product-detail__link" href="/#products">
              Back to catalogue
            </Link>
          </div>

          <Card
            className="product-detail__card"
            eyebrow="Inventory semantics"
            title="Stock and price are read-only"
          >
            <p>
              Price is shown as {formatCurrency(product.priceCents)} and availability reflects the current
              approved stock count of {product.stockQuantity}.
            </p>
          </Card>

          {source === "fixture" ? (
            <aside className="product-detail__fallback" aria-label="Fixture fallback notice">
              <p className="product-detail__fallback-eyebrow">Fixture fallback</p>
              <h2>Using approved fixture content</h2>
              <p>
                The live product row was not available, so this page is rendering the approved read-only
                fixture for review and design continuity.
              </p>
              {fallbackReason === "live-unavailable" ? <span>Live data source unavailable.</span> : null}
            </aside>
          ) : null}
        </div>
      </section>
    </article>
  );
}

