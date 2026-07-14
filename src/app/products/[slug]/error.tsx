"use client";

import Link from "next/link";
import { ApplicationShell } from "@/components/shell/ApplicationShell";

export default function ProductError({ reset }: { reset: () => void }) {

  return (
    <ApplicationShell activeRoute="products" showStatePanel={false}>
      <section className="shell-api-error" role="alert" aria-labelledby="product-error-title">
        <span className="shell-api-error__mark" aria-hidden="true">✦</span>
        <p className="shell-api-error__eyebrow">A pause in the journey</p>
        <h1 id="product-error-title">We couldn’t gather this product’s details.</h1>
        <p>
          The connection may have softened for a moment. Your place is safe—try again, or continue browsing while we reconnect.
        </p>
        <div className="shell-api-error__actions">
          <button type="button" onClick={reset}>Try again</button>
          <Link href="/products">Browse wellness products</Link>
        </div>
      </section>
    </ApplicationShell>
  );
}