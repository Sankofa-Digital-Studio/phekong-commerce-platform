"use client";

import Link from "next/link";
import { useState } from "react";
import { catalogueProducts } from "@/lib/products/fixture-repository";
import { formatCurrency, getProductAvailability } from "@/lib/products/repository";
import type { ProductCatalogueItem } from "@/lib/products/types";
import "./rituals-screen.css";

type RitualId = "daily-softness" | "weekly-renewal" | "hair-nourishment";

interface RitualStep {
  label: string;
  title: string;
  description: string;
  cadence: string;
}

interface RitualDefinition {
  id: RitualId;
  shortLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  duration: string;
  cadence: string;
  productSlugs: ReadonlyArray<ProductCatalogueItem["slug"]>;
  steps: ReadonlyArray<RitualStep>;
}

const rituals = [
  {
    id: "daily-softness",
    shortLabel: "Daily softness",
    eyebrow: "An easy everyday ritual",
    title: "Cleanse gently. Seal in softness.",
    description: "A two-product body ritual for shoppers who want a simple, repeatable place to begin.",
    duration: "3–5 minutes",
    cadence: "Daily",
    productSlugs: ["turmeric-honey-soap", "nourishing-shea-butter"],
    steps: [
      { label: "01 · Prepare", title: "Begin with warm water", description: "Take a quiet moment to soften the skin and prepare for a gentle cleanse.", cadence: "Morning or evening" },
      { label: "02 · Cleanse", title: "Wash without rushing", description: "Work the Turmeric & Honey Soap into a light lather, then rinse thoroughly.", cadence: "About 60 seconds" },
      { label: "03 · Seal", title: "Finish while skin is damp", description: "Massage in Nourishing Shea Butter, giving extra attention to dry areas.", cadence: "As needed" },
    ],
  },
  {
    id: "weekly-renewal",
    shortLabel: "Weekly renewal",
    eyebrow: "A slower weekly reset",
    title: "Polish, replenish, and pause.",
    description: "A considered weekly sequence that keeps the exfoliating step optional and the finish nourishing.",
    duration: "8–10 minutes",
    cadence: "Once weekly",
    productSlugs: ["exfoliating-sugar-scrub", "nourishing-shea-butter"],
    steps: [
      { label: "01 · Soften", title: "Let warmth do the first work", description: "Use warm water to prepare the body before introducing an exfoliating step.", cadence: "2 minutes" },
      { label: "02 · Polish", title: "Use a light, careful touch", description: "Massage the scrub gently over the body and stop if the skin feels uncomfortable.", cadence: "Once weekly" },
      { label: "03 · Replenish", title: "Return moisture to the skin", description: "Follow with Shea Butter to leave the ritual feeling complete and unhurried.", cadence: "After rinsing" },
    ],
  },
  {
    id: "hair-nourishment",
    shortLabel: "Hair nourishment",
    eyebrow: "A focused finishing ritual",
    title: "Make the final step count.",
    description: "A compact hair ritual that introduces one approved finishing oil without adding unnecessary products.",
    duration: "4–6 minutes",
    cadence: "2–3 times weekly",
    productSlugs: ["growth-strength-oil"],
    steps: [
      { label: "01 · Prepare", title: "Start with clean, sectioned hair", description: "Gently detangle and divide the hair so the finishing product can be applied with control.", cadence: "After cleansing" },
      { label: "02 · Apply", title: "Use a small amount first", description: "Warm a little oil between your palms and distribute it through the intended areas.", cadence: "Build only if needed" },
      { label: "03 · Finish", title: "Smooth and leave it to settle", description: "Complete your preferred style without overloading the hair with extra product.", cadence: "2–3 times weekly" },
    ],
  },
] as const satisfies ReadonlyArray<RitualDefinition>;

export interface RitualsScreenProps {
  initialRitual?: RitualId;
}

export function RitualsScreen({ initialRitual = "daily-softness" }: RitualsScreenProps) {
  const [selectedId, setSelectedId] = useState<RitualId>(initialRitual);
  const selectedRitual = rituals.find((ritual) => ritual.id === selectedId) ?? rituals[0];
  const matchedProducts = selectedRitual.productSlugs.flatMap((slug) => {
    const product = catalogueProducts.find((item) => item.slug === slug);
    return product ? [product] : [];
  });

  return (
    <div className="rituals-screen">
      <nav className="rituals-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Rituals</span>
      </nav>

      <section className="rituals-hero" aria-labelledby="rituals-title">
        <div className="rituals-hero__copy">
          <p className="rituals-eyebrow">Guided wellness rituals</p>
          <h1 id="rituals-title">A calmer way to choose what comes next.</h1>
          <p className="rituals-hero__lede">Start with the feeling you want to support. We will turn a small set of approved products into a clear, repeatable sequence—without making medical promises or adding steps you do not need.</p>
          <div className="rituals-hero__actions">
            <a className="rituals-button rituals-button--primary" href="#ritual-finder">Find your ritual<ArrowIcon /></a>
            <Link className="rituals-button rituals-button--secondary" href="/products">Browse all products</Link>
          </div>
          <ul className="rituals-assurances" aria-label="Ritual guidance principles">
            <li>Simple steps</li><li>Approved products</li><li>Honest availability</li>
          </ul>
        </div>
        <div className="rituals-hero__visual" aria-label="Three-step ritual preview">
          <span className="rituals-hero__orbit rituals-hero__orbit--one" aria-hidden="true" />
          <span className="rituals-hero__orbit rituals-hero__orbit--two" aria-hidden="true" />
          <HeroSeal number="01" label="Prepare" />
          <HeroSeal number="02" label="Care" className="rituals-hero__seal--middle" />
          <HeroSeal number="03" label="Finish" className="rituals-hero__seal--last" />
          <p>Three deliberate steps. No clutter.</p>
        </div>
      </section>

      <section className="ritual-finder" id="ritual-finder" aria-labelledby="ritual-finder-title">
        <div className="ritual-finder__intro">
          <p className="rituals-eyebrow">Choose your starting point</p>
          <h2 id="ritual-finder-title">What would you like your ritual to support?</h2>
          <p>Choose one goal to see a complete sequence. You can change your mind at any time.</p>
        </div>
        <fieldset className="ritual-picker">
          <legend className="visually-hidden">Choose a ritual goal</legend>
          {rituals.map((ritual) => (
            <button key={ritual.id} className="ritual-picker__option" type="button" aria-pressed={selectedId === ritual.id} onClick={() => setSelectedId(ritual.id)}>
              <span className="ritual-picker__mark" aria-hidden="true" /><span>{ritual.shortLabel}</span>
            </button>
          ))}
        </fieldset>

        <div className="ritual-plan" aria-live="polite">
          <header className="ritual-plan__header">
            <div>
              <p className="rituals-eyebrow">{selectedRitual.eyebrow}</p>
              <h2>{selectedRitual.title}</h2>
              <p>{selectedRitual.description}</p>
            </div>
            <dl className="ritual-plan__meta">
              <div><dt>Time</dt><dd>{selectedRitual.duration}</dd></div>
              <div><dt>Rhythm</dt><dd>{selectedRitual.cadence}</dd></div>
            </dl>
          </header>
          <ol className="ritual-steps">
            {selectedRitual.steps.map((step) => (
              <li key={step.label} className="ritual-step">
                <p className="ritual-step__label">{step.label}</p><h3>{step.title}</h3><p>{step.description}</p><span>{step.cadence}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ritual-products" aria-labelledby="ritual-products-title">
        <div className="ritual-products__heading">
          <div><p className="rituals-eyebrow">Matched to this ritual</p><h2 id="ritual-products-title">A focused product set</h2></div>
          <p>Start with one item or follow the full sequence. Availability is shown from the approved catalogue fixture.</p>
        </div>
        <div className="ritual-product-grid">
          {matchedProducts.map((product, index) => <RitualProductCard key={product.slug} product={product} step={index + 1} />)}
        </div>
        <div className="ritual-products__footer">
          <p>Not sure yet? The complete catalogue lets you compare every approved product.</p>
          <Link className="ritual-button-link" href="/products">Explore the full catalogue<ArrowIcon /></Link>
        </div>
      </section>

      <aside className="rituals-note" aria-labelledby="rituals-note-title">
        <p className="rituals-note__mark" aria-hidden="true">P</p>
        <div>
          <p className="rituals-eyebrow">A note from Phekong</p>
          <h2 id="rituals-note-title">Consistency should feel supportive, not demanding.</h2>
          <p>Begin with the smallest ritual you can repeat comfortably. Product guidance here is general and does not replace advice from a qualified health professional when you have a persistent concern.</p>
        </div>
      </aside>
    </div>
  );
}

function HeroSeal({ number, label, className = "" }: { number: string; label: string; className?: string }) {
  return <div className={`rituals-hero__seal ${className}`}><span>{number}</span><strong>{label}</strong></div>;
}

function RitualProductCard({ product, step }: { product: ProductCatalogueItem; step: number }) {
  const availability = getProductAvailability(product);
  return (
    <article className="ritual-product-card">
      <div className="ritual-product-card__visual" aria-hidden="true"><span>{String(step).padStart(2, "0")}</span><LeafIcon /></div>
      <div className="ritual-product-card__body">
        <div className="ritual-product-card__topline"><p>{product.category}</p><span className={`ritual-stock ritual-stock--${availability.tone}`}>{availability.label}</span></div>
        <h3>{product.name}</h3><p>{product.description}</p>
        <div className="ritual-product-card__footer"><strong>{formatCurrency(product.priceCents)}</strong><Link href={`/products/${product.slug}`}>View product<ArrowIcon /></Link></div>
      </div>
    </article>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 5.5 19.5 12 13 18.5l-1.4-1.4 4.1-4.1H4.5v-2h11.2l-4.1-4.1L13 5.5Z" /></svg>;
}

function LeafIcon() {
  return <svg viewBox="0 0 80 80" aria-hidden="true"><path d="M65 13C40 11 20 24 16 49c13 1 25-2 34-11 7-7 11-16 15-25Z" /><path d="M17 59c8-17 20-28 37-36" /></svg>;
}
