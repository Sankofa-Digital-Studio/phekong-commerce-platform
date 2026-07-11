"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ActionFeedback, type FeedbackState } from "@/components/ui/ActionFeedback";
import "./commerce-preview.css";

type PreviewStep = "cart" | "payment" | "wishlist" | "profile";

const stepCopy: Record<PreviewStep, { title: string; description: string }> = {
  cart: {
    title: "Cart overview",
    description: "Review the items and see the subtotal, delivery estimate, and available actions.",
  },
  payment: {
    title: "Payment preview",
    description: "See how the checkout flow would behave once a payment provider is connected.",
  },
  wishlist: {
    title: "Favorites",
    description: "Keep products within reach even before account persistence exists.",
  },
  profile: {
    title: "Profile preview",
    description: "Optional account controls for shoppers who want order history and saved details later.",
  },
};

const sampleCart = [
  { name: "Nourishing Shea Butter", price: "R 320.00", status: "In stock" },
  { name: "Restorative Body Oil", price: "R 280.00", status: "Low stock" },
];

const sampleWishlist = [
  { name: "Exfoliating Sugar Scrub", note: "Add to cart later" },
  { name: "Turmeric & Honey Soap", note: "Seasonal favorite" },
  { name: "Marula Hair Mask", note: "Complete the routine" },
];

export function CommercePreview({ initialStep = "cart" }: { initialStep?: PreviewStep }) {
  const [activeStep, setActiveStep] = useState<PreviewStep>(initialStep);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const totals = useMemo(() => {
    const subtotal = 600;
    const delivery = 45;
    return { subtotal, delivery, total: subtotal + delivery };
  }, []);

  function announce(message: string, tone: FeedbackState["tone"] = "success") {
    setFeedback({ tone, message });
  }

  return (
    <section className="commerce-preview" aria-label="Commerce preview shell">
      <Card eyebrow="Commerce flow" title="Visual checkout and account preview" tone="accent" className="commerce-preview__hero">
        <p className="commerce-preview__lede">
          This shell is intentionally visual first. It shows the cart, payment, favorites, and profile surfaces
          without requiring backend persistence yet.
        </p>
        <div className="commerce-preview__tabs" role="tablist" aria-label="Preview sections">
          {(Object.keys(stepCopy) as PreviewStep[]).map((step) => (
            <button
              key={step}
              type="button"
              role="tab"
              aria-selected={activeStep === step}
              className={`commerce-preview__tab ${activeStep === step ? "is-active" : ""}`}
              onClick={() => {
                setActiveStep(step);
                announce(`Opened ${stepCopy[step].title.toLowerCase()}.`);
              }}
            >
              {stepCopy[step].title}
            </button>
          ))}
        </div>
      </Card>

      <div className="commerce-preview__grid">
        <Card eyebrow={stepCopy[activeStep].title} title={stepCopy[activeStep].title} tone="surface" className="commerce-preview__panel">
          <p className="commerce-preview__description">{stepCopy[activeStep].description}</p>

          {activeStep === "cart" ? (
            <div className="commerce-preview__stack">
              {sampleCart.map((item) => (
                <article key={item.name} className="commerce-preview__item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.status}</p>
                  </div>
                  <span>{item.price}</span>
                </article>
              ))}
              <div className="commerce-preview__summary">
                <div><span>Subtotal</span><strong>R {totals.subtotal.toFixed(2)}</strong></div>
                <div><span>Delivery</span><strong>R {totals.delivery.toFixed(2)}</strong></div>
                <div><span>Total</span><strong>R {totals.total.toFixed(2)}</strong></div>
              </div>
              <div className="commerce-preview__actions">
                <Button onClick={() => announce("Checkout preview is not connected yet.", "blocked")}>Proceed to payment</Button>
                <Link className="commerce-preview__link" href="/products">Continue shopping</Link>
              </div>
            </div>
          ) : null}

          {activeStep === "payment" ? (
            <div className="commerce-preview__stack">
              <article className="commerce-preview__card-surface">
                <p className="commerce-preview__eyebrow">Payment method preview</p>
                <strong>Card, bank transfer, or cash on collection</strong>
                <p>Provider integrations stay offscreen for now, but the checkout layout can still be reviewed.</p>
                <div className="commerce-preview__chips" aria-label="Supported preview methods">
                  <span>Card</span>
                  <span>Cash</span>
                  <span>Manual reference</span>
                </div>
              </article>
              <div className="commerce-preview__actions">
                <Button variant="secondary" onClick={() => announce("Payment capture is not connected yet.", "blocked")}>Save payment draft</Button>
                <Button onClick={() => announce("Test payment flow opened in preview mode.")}>Open payment preview</Button>
              </div>
            </div>
          ) : null}

          {activeStep === "wishlist" ? (
            <div className="commerce-preview__stack">
              {sampleWishlist.map((item) => (
                <article key={item.name} className="commerce-preview__wishlist-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.note}</p>
                  </div>
                  <Button variant="ghost" onClick={() => announce(`${item.name} saved to wishlist preview.`)}>
                    Save
                  </Button>
                </article>
              ))}
            </div>
          ) : null}

          {activeStep === "profile" ? (
            <div className="commerce-preview__stack">
              <article className="commerce-preview__profile-card">
                <p className="commerce-preview__eyebrow">Optional account layer</p>
                <strong>Shop without signing in</strong>
                <p>Registration, saved addresses, and order history can be introduced later without blocking browsing.</p>
              </article>
              <div className="commerce-preview__actions">
                <Button variant="secondary" onClick={() => announce("Account registration is preview-only.", "blocked")}>Create account</Button>
                <Button onClick={() => announce("Profile preview loaded.")}>Preview profile settings</Button>
              </div>
            </div>
          ) : null}
        </Card>

        <div className="commerce-preview__rail">
          <Card eyebrow="Flow" title="Flow checkpoints" tone="surface" className="commerce-preview__mini-card">
            <ul className="commerce-preview__checklist">
              <li>Cart summary is readable on small screens.</li>
              <li>Payment is presented as a preview, not a live capture.</li>
              <li>Favorites remain useful without persistence.</li>
              <li>Profile stays optional for shopping.</li>
            </ul>
          </Card>

          <Card eyebrow="Note" title="Implementation boundary" tone="surface" className="commerce-preview__mini-card">
            <p className="commerce-preview__boundary">
              This is frontend-only shell work. Backend persistence, provider callbacks, and account CRUD will stay
              off until their issue bundle is ready.
            </p>
          </Card>
        </div>
      </div>

      <ActionFeedback state={feedback} />
    </section>
  );
}
