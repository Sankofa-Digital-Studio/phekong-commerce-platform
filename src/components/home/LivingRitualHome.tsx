"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { catalogueProducts } from "@/components/catalogue/ProductCatalogue";
import "./living-ritual-home.css";

export type RitualKey = "restore" | "ground" | "care" | "renew";

const ritualOrder: RitualKey[] = ["restore", "ground", "care", "renew"];

const rituals = {
  restore: {
    feeling: "Restored",
    label: "I need to feel restored",
    action: "Build my restoring ritual",
    heading: "Restore your rhythm",
    productSlug: "growth-strength-oil",
    image: "/images/phekong-hero-reference.png",
    alt: "Phekong restorative body oil arranged with warm botanical ingredients.",
    steps: [
      ["Arrive", "Take one quiet minute. Let the day stop at the door."],
      ["Apply", "Warm a small amount between your hands and move with intention."],
      ["Return", "Notice the texture, the scent and the time you chose for yourself."],
    ],
  },
  ground: {
    feeling: "Grounded",
    label: "I want to slow down",
    action: "Build my grounding ritual",
    heading: "Come back to the present",
    productSlug: "turmeric-honey-soap",
    image: "/images/product-turmeric-soap.png",
    alt: "Golden turmeric and honey soap beside leaves and natural textures.",
    steps: [
      ["Pause", "Let warm water mark the edge between the day and this moment."],
      ["Cleanse", "Work the soap slowly between your hands and breathe naturally."],
      ["Begin", "Step forward feeling clear, present and ready for what comes next."],
    ],
  },
  care: {
    feeling: "Cared for",
    label: "I want to feel cared for",
    action: "Build my care ritual",
    heading: "Make room for softness",
    productSlug: "nourishing-shea-butter",
    image: "/images/product-shea-butter.png",
    alt: "Nourishing shea butter on stone among deep green botanical leaves.",
    steps: [
      ["Soften", "Begin after bathing, while your skin still holds a little warmth."],
      ["Nourish", "Take your time over the places asking for more attention."],
      ["Keep", "Carry that feeling of care into the rest of your day."],
    ],
  },
  renew: {
    feeling: "Renewed",
    label: "I want a fresh beginning",
    action: "Build my renewal ritual",
    heading: "Leave space for what comes next",
    productSlug: "exfoliating-sugar-scrub",
    image: "/images/product-sugar-scrub.png",
    alt: "Amber sugar scrub surrounded by wood, stone and botanical details.",
    steps: [
      ["Release", "Let the water settle you before reaching for anything else."],
      ["Renew", "Move gently and deliberately, giving attention rather than rushing."],
      ["Emerge", "Finish with a breath and the sense of a chapter newly opened."],
    ],
  },
} as const;

function productFor(slug: string) {
  return catalogueProducts.find((product) => product.slug === slug) ?? catalogueProducts[0];
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(cents / 100);
}

export function LivingRitualHome() {
  const [selected, setSelected] = useState<RitualKey | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const active = selected ? rituals[selected] : rituals.restore;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("ritual");
    const saved = window.sessionStorage.getItem("phekong-ritual");
    const initial = ritualOrder.includes(query as RitualKey) ? query as RitualKey : ritualOrder.includes(saved as RitualKey) ? saved as RitualKey : null;
    const restore = window.setTimeout(() => setSelected((current) => current ?? initial), 0);
    return () => window.clearTimeout(restore);
  }, []);

  function chooseRitual(key: RitualKey) {
    setSelected(key);
    setImageReady(false);
    window.sessionStorage.setItem("phekong-ritual", key);
    const url = new URL(window.location.href);
    url.searchParams.set("ritual", key);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function revealRitual() {
    document.getElementById("your-ritual")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return (
    <div className="living-home">
      <section className="living-hero" aria-labelledby="living-title">
        <div className="living-hero__copy">
          <p className="living-kicker">Welkom, South Africa · Since 2006</p>
          <h1 id="living-title">How do you want to feel today?</h1>
          <p className="living-intro">Begin with what you need. We’ll guide you toward a simple Phekong ritual.</p>
          <fieldset className="feeling-picker">
            <legend>Choose how you want to feel</legend>
            {ritualOrder.map((key) => (
              <button key={key} type="button" className={selected === key ? "is-selected" : ""} aria-pressed={selected === key} onClick={() => chooseRitual(key)}>
                <span aria-hidden="true" />{rituals[key].label}
              </button>
            ))}
          </fieldset>
          <button className="living-primary" type="button" disabled={!selected} onClick={revealRitual}>
            {selected ? rituals[selected].action : "Choose a feeling to begin"}<Arrow />
          </button>
        </div>
        <div className={`living-hero__art ${imageReady ? "is-ready" : ""}`}>
          {!imageReady && <span className="seed-loader" role="status"><i aria-hidden="true" />Preparing your ritual</span>}
          <Image key={active.image} src={active.image} alt={active.alt} fill priority sizes="(max-width: 767px) 100vw, 52vw" onLoad={() => setImageReady(true)} />
          <p>Begin with one small act.</p>
        </div>
      </section>

      {selected && <RitualReveal ritualKey={selected} />}
      <OriginStory />
      <RitualWardrobe selected={selected} />
      <BrandPrinciples />
      <ClosingInvitation onBuild={() => document.getElementById("living-title")?.scrollIntoView({ behavior: "smooth" })} />
    </div>
  );
}

function RitualReveal({ ritualKey }: { ritualKey: RitualKey }) {
  const ritual = rituals[ritualKey];
  const product = productFor(ritual.productSlug);
  return <section id="your-ritual" className="ritual-reveal" aria-live="polite">
    <p className="living-kicker">Your Phekong ritual</p>
    <h2>{ritual.heading}</h2>
    <div className="ritual-steps">{ritual.steps.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    <Link className="living-text-link" href={`/products/${product.slug}`}>Meet your ritual: {product.name}<Arrow /></Link>
  </section>;
}

function OriginStory() {
  return <section className="origin-story" id="our-story"><div className="origin-year" aria-hidden="true">2006</div><div className="origin-copy">
    <p className="living-kicker">Our beginning · Welkom, Free State</p>
    <h2>Before Phekong was a shelf of products, it was a belief.</h2>
    <p>Care was never meant to feel distant or extravagant. Phekong carries forward a South African story of holistic wellness, natural healing and traditional wisdom—made relevant to the lives we live now.</p>
    <Link className="living-text-link" href="/about">Discover where Phekong began<Arrow /></Link>
  </div></section>;
}

function RitualWardrobe({ selected }: { selected: RitualKey | null }) {
  const featuredSlug = selected ? rituals[selected].productSlug : rituals.restore.productSlug;
  const ordered = [...catalogueProducts].sort((a, b) => Number(b.slug === featuredSlug) - Number(a.slug === featuredSlug));
  return <section className="ritual-wardrobe" aria-labelledby="wardrobe-title">
    <header><p className="living-kicker">Choose what you carry forward</p><h2 id="wardrobe-title">A ritual becomes real when you make it yours.</h2><Link className="living-text-link" href="/products">Explore every Phekong essential<Arrow /></Link></header>
    <div className="wardrobe-grid">{ordered.map((item, index) => <ProductTile key={item.slug} product={item} featured={index === 0} role={ritualRole(item.slug)} />)}</div>
  </section>;
}

function ritualRole(slug: string) { return slug === "growth-strength-oil" ? "Restore" : slug === "turmeric-honey-soap" ? "Ground" : slug === "nourishing-shea-butter" ? "Care" : "Renew"; }

function ProductTile({ product, featured, role }: { product: (typeof catalogueProducts)[number]; featured: boolean; role: string }) {
  return <article className={`ritual-product ${featured ? "is-featured" : ""}`}>
    <div className="ritual-product__image"><Image src={product.imageSrc} alt={product.imageAlt} fill sizes={featured ? "(max-width: 767px) 100vw, 50vw" : "(max-width: 767px) 50vw, 24vw"} /><span className={`stock ${product.stockQuantity === 0 ? "is-out" : ""}`}>{product.stockQuantity === 0 ? "Out of stock" : product.stockQuantity <= product.lowStockThreshold ? "Low stock" : "In stock"}</span><button type="button" className="save-product" aria-label={`Save ${product.name}`}><Heart /></button></div>
    <div className="ritual-product__copy"><p>{role}</p><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>{featured && <p className="product-description">{product.description}</p>}<strong>{formatPrice(product.priceCents)}</strong>{product.stockQuantity === 0 && <Link className="restock-link" href="/contact">Join the restock list</Link>}</div>
  </article>;
}

function BrandPrinciples() { return <section className="brand-principles" aria-labelledby="principles-title"><p className="living-kicker">What guides us</p><h2 id="principles-title">Care without performance theatre.</h2><div><Principle title="Rooted in place">Born in Welkom, shaped by a South African understanding of everyday care.</Principle><Principle title="Made with intention">Clear purpose, considered products and no manufactured promises.</Principle><Principle title="Guided by your ritual">Choose according to the moment you need, not an overwhelming catalogue.</Principle></div></section>; }
function Principle({ title, children }: { title: string; children: string }) { return <article><Botanical /><h3>{title}</h3><p>{children}</p></article>; }

function ClosingInvitation({ onBuild }: { onBuild: () => void }) { return <section className="closing-invitation"><Botanical /><p>You do not need to become someone new.</p><h2>Begin by returning to yourself.</h2><div><button type="button" className="living-primary" onClick={onBuild}>Build my ritual<Arrow /></button><Link href="/contact" className="living-secondary">Speak with Phekong</Link></div></section>; }

function Arrow() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-5 5 5-5 5" /></svg>; }
function Heart() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>; }
function Botanical() { return <svg className="botanical-mark" viewBox="0 0 72 72" aria-hidden="true"><path d="M11 61C26 46 31 29 34 10M33 31c-9-2-15-8-17-17 10 0 16 6 17 17Zm1 9c9-2 16-8 20-18-11 0-18 7-20 18Z" /></svg>; }
