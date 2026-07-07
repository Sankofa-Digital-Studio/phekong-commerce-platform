import { ApplicationShell } from "@/components/shell/ApplicationShell";

export default function LoadingProductPage() {
  return (
    <ApplicationShell activeRoute="products" showStatePanel={false}>
      <section className="product-detail" aria-busy="true" aria-label="Loading product detail">
        <div className="product-detail__hero">
          <div className="product-detail__media product-detail__media--loading" />
          <div className="product-detail__copy">
            <p className="product-detail__eyebrow">Loading product</p>
            <div className="product-detail__skeleton product-detail__skeleton-title" />
            <div className="product-detail__skeleton product-detail__skeleton-line" />
            <div className="product-detail__skeleton product-detail__skeleton-line" />
            <div className="product-detail__skeleton product-detail__skeleton-chip" />
            <div className="product-detail__skeleton product-detail__skeleton-card" />
          </div>
        </div>
      </section>
    </ApplicationShell>
  );
}

