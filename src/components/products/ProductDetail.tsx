"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ApprovedImage } from "@/components/media/ApprovedImage";
import { ActionFeedback, type FeedbackState } from "@/components/ui/ActionFeedback";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  getApprovedImageAsset,
  responsiveImageSizes,
} from "@/lib/images/approved-assets";
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
  const imageAsset = getApprovedImageAsset(product.imageAssetId);
  const [isAdding, setIsAdding] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(
    availability.tone === "out-of-stock"
      ? { tone: "blocked", message: "This product is currently out of stock and cannot be added to the cart." }
      : null,
  );

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => setFeedback(null), feedback.tone === "loading" ? 900 : 2400);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  async function addToCart() {
    if (availability.tone === "out-of-stock") {
      setFeedback({ tone: "blocked", message: "This product is currently unavailable and cannot be added." });
      return;
    }

    setIsAdding(true);
    setFeedback({ tone: "loading", message: `Adding ${product.name} to the cart preview...` });

    try {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 420));
      setFeedback({ tone: "success", message: `${product.name} added to the cart preview.` });
    } catch {
      setFeedback({ tone: "error", message: `Could not add ${product.name} to the cart preview.` });
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <article className="product-detail">
      <section className="product-detail__hero">
        <div className="product-detail__media">
          <ApprovedImage
            className="product-detail__image"
            src={imageAsset.src}
            alt={imageAsset.alt}
            width={imageAsset.width}
            height={imageAsset.height}
            sizes={responsiveImageSizes.productDetail}
            quality={75}
            priority
            fallbackLabel="Product image unavailable"
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
            <Button
              size="medium"
              variant="primary"
              type="button"
              disabled={availability.tone === "out-of-stock"}
              loading={isAdding}
              onClick={() => void addToCart()}
            >
              {availability.tone === "out-of-stock" ? "Unavailable" : "Add to cart"}
            </Button>
            <Link className="product-detail__link" href="/products#products">
              Back to catalogue
            </Link>
          </div>

          <ActionFeedback state={feedback} />

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
