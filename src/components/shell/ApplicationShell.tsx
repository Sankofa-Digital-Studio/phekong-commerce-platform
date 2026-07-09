"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCatalogue, type ProductCatalogueState } from "../catalogue/ProductCatalogue";
import { shellCopy, type ShellLocale } from "./translations";
import "./application-shell.css";

export type ShellState = "ready" | "loading" | "empty" | "error";

export interface ApplicationShellProps {
  children?: ReactNode;
  locale?: ShellLocale;
  state?: ShellState;
  activeRoute?: "home" | "about" | "products" | "services" | "contact";
  showStatePanel?: boolean;
  catalogueState?: ProductCatalogueState;
  catalogueOnRetry?: () => void;
}

export function ApplicationShell({
  children,
  locale = "en",
  state = "ready",
  activeRoute = "home",
  showStatePanel = true,
  catalogueState = "ready",
  catalogueOnRetry,
}: ApplicationShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = shellCopy[locale];
  const shellContent =
    children ?? (!showStatePanel ? <HomeSurface catalogueState={catalogueState} onRetry={catalogueOnRetry} /> : null);

  const links = [
    ["home", t.home],
    ["shop", "Shop"],
    ["collections", "Collections"],
    ["about", t.about],
    ["rituals", "Rituals"],
    ["contact", t.contact],
  ] as const;

  const routeHref = (route: string) => {
    switch (route) {
      case "home":
        return "/";
      case "shop":
        return "/#products";
      case "contact":
        return "/#contact";
      default:
        return "/";
    }
  };

  return (
    <div className="phekong-canvas phekong-canvas--luxury">
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#main-content" aria-label={t.brandAria}>
            <span className="brand-mark" aria-hidden="true">
              <LeafMark />
            </span>
            <span className="brand-copy">
              <strong>PHEKONG</strong>
            </span>
          </a>

          <nav className="desktop-nav" aria-label={t.navAria}>
            {links.map(([route, label]) => (
              <Link key={route} className="nav-link" href={routeHref(route)} aria-current={route === activeRoute ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-button" type="button" aria-label="Search" onClick={() => window.location.hash = "#products"}>
              <SearchIcon />
            </button>
            <button className="icon-button" type="button" aria-label="Account" onClick={() => window.location.href = "/account"}>
              <UserIcon />
            </button>
            <button className="icon-button icon-button--bag" type="button" aria-label="Cart" onClick={() => window.location.href = "/cart"}>
              <BagIcon />
              <span className="icon-badge">2</span>
            </button>
            <Link className="shell-header-cta" href="/#contact">
              Ask About a Product
            </Link>
            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? t.menuClose : t.menuOpen}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label={t.mobileNavAria}>
            {links.map(([route, label]) => (
              <Link
                key={route}
                className="nav-link"
                href={routeHref(route)}
                aria-current={route === activeRoute ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content" className="shell-main" aria-busy={state === "loading" ? "true" : "false"}>
        {showStatePanel && <ShellStatePanel state={state} />}

        {shellContent}
      </main>

      <footer className="site-footer" id="contact">
        <strong>Phekong {t.wellnessCentre}</strong>
        <span>Copyright 2026 Sankofa Digital</span>
      </footer>
    </div>
  );
}

function HomeSurface({
  catalogueState,
  onRetry,
}: {
  catalogueState: ProductCatalogueState;
  onRetry?: () => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Rituals that restore balance.",
      product: "Restorative Body Oil",
      image: "/images/phekong-hero-reference.png",
      alt: "Phekong restorative body oil arranged with ritual ingredients on a dark surface.",
      slug: "growth-strength-oil",
    },
    {
      title: "Nourish your daily ritual.",
      product: "Nourishing Shea Butter",
      image: "/images/product-shea-butter.png",
      alt: "A creamy shea butter jar on a stone pedestal with botanical leaves.",
      slug: "nourishing-shea-butter",
    },
    {
      title: "Exfoliate with intention.",
      product: "Exfoliating Sugar Scrub",
      image: "/images/product-sugar-scrub.png",
      alt: "A warm amber scrub jar with botanical accents on stone and wood.",
      slug: "exfoliating-sugar-scrub",
    },
    {
      title: "Craft your wellness.",
      product: "Turmeric & Honey Soap",
      image: "/images/product-turmeric-soap.png",
      alt: "Stacked turmeric soap bars beside a kraft box with honey accents and leaves.",
      slug: "turmeric-honey-soap",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const slide = slides[currentSlide];

  return (
    <div className="shell-surface">
      <section className="shell-hero" id="home">
        <div className="shell-hero__dots" aria-hidden="true">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`shell-hero__dot ${index === currentSlide ? "is-active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="shell-hero__copy">
          <p className="shell-hero__kicker">ROOTED IN NATURE, MADE FOR YOU</p>
          <h1>{slide.title}</h1>
          <div className="shell-hero__rule" aria-hidden="true">
            <span />
            <LeafDividerIcon />
            <span />
          </div>
          <p className="shell-hero__intro">
            Phekong crafts natural body and hair care with intention. Pure ingredients. Conscious rituals.
            Real results.
          </p>
          <div className="shell-hero__actions">
            <a className="shell-cta" href="#products">
              Explore Our Products
              <ArrowRightIcon />
            </a>
          </div>

          <div className="shell-trust">
            <div className="shell-trust__avatars" aria-label="Trusted by 1,200+ customers">
              <span className="shell-avatar shell-avatar--one">A</span>
              <span className="shell-avatar shell-avatar--two">K</span>
              <span className="shell-avatar shell-avatar--three">M</span>
            </div>
            <div className="shell-trust__copy">
              <span>Trusted by 1,200+ customers</span>
              <div className="shell-trust__rating">
                <StarsRow />
                <span>4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="shell-hero__visual" aria-label={`Editor's pick: ${slide.product}`}>
          <h2 className="visually-hidden">{slide.product}</h2>
          <div className="shell-hero__carousel">
            <Image
              className="shell-hero__image"
              src={slide.image}
              alt={slide.alt}
              width={1200}
              height={900}
              priority
            />
            <div className="shell-hero__product-card">
              <p className="shell-hero__product-eyebrow">EDITOR'S PICK</p>
              <h3>{slide.product}</h3>
              <p>A deeply nourishing blend that restores, softens and renews. Infused with marula, baobab and vitamin E.</p>
              <p className="shell-hero__product-price">R 320.00</p>
              <p className="shell-hero__product-status">● In Stock • Ready to Ship</p>
              <Link href={`/products/${slide.slug}`} className="shell-hero__product-link">
                View Product
              </Link>
            </div>
          </div>
          <button className="shell-hero__nav shell-hero__nav--prev" onClick={prevSlide} aria-label="Previous slide">
            <ArrowLeftIcon />
          </button>
          <button className="shell-hero__nav shell-hero__nav--next" onClick={nextSlide} aria-label="Next slide">
            <ArrowRightIcon />
          </button>
        </aside>
      </section>

      <section className="shell-feature-strip" aria-label="Key brand commitments">
        <FeatureItem icon={<LeafIcon />} title="Clean Ingredients" copy="No nasties. Ever." />
        <FeatureItem icon={<BowlIcon />} title="Made in Small Batches" copy="Quality over quantity." />
        <FeatureItem icon={<RabbitIcon />} title="Cruelty Free" copy="Kind to animals." />
        <FeatureItem icon={<RecycleIcon />} title="Sustainable Packaging" copy="Good for you & the planet." />
      </section>

      <ProductCatalogue state={catalogueState} onRetry={onRetry} />

      <section className="shell-metrics" aria-label="Trust metrics">
        <MetricItem icon={<LeafBadgeIcon />} value="100%" label="Natural Ingredients" />
        <MetricItem icon={<UsersIcon />} value="1,200+" label="Happy Customers" />
        <MetricItem icon={<StarBadgeIcon />} value="4.9/5" label="Average Rating" />
        <MetricItem icon={<ShieldIcon />} value="30-Day" label="Love It or Return It Guarantee" />
      </section>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  copy,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <article className="shell-feature">
      <span className="shell-feature__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </article>
  );
}

function MetricItem({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <article className="shell-metric">
      <span className="shell-metric__icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}

function ShellStatePanel({ state }: { state: ShellState }) {
  const copy = {
    ready: ["Ready state", "The shell is ready and the public experience is visible."],
    loading: ["Loading state", "The shell is loading its content."],
    empty: ["Empty state", "No content is available yet."],
    error: ["Error state", "Something went wrong while loading the shell."],
  }[state];

  return (
    <section className={`state-panel state-${state}`} aria-live="polite">
      {state === "loading" && <span className="spinner" aria-hidden="true" />}
      <h1>{copy[0]}</h1>
      <p>{copy[1]}</p>
    </section>
  );
}

function LeafMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.75 4.8c-4.8-.8-8.42.55-10.82 2.88C5.24 10.35 4.5 14.08 4.5 17.8c3.76 0 7.47-.72 10.12-3.38 2.33-2.33 3.68-5.94 2.88-9.62-1.26 3.22-3.24 5.92-6.21 8.03-1.58 1.13-3.42 2.03-5.53 2.67 2.49-1.47 4.63-3.28 6.42-5.45 1.61-1.96 2.9-4.24 3.57-7.25Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.5 4a6.5 6.5 0 1 0 4.12 11.54l4.42 4.42 1.41-1.41-4.42-4.42A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12.25A4.25 4.25 0 1 0 12 3.75a4.25 4.25 0 0 0 0 8.5Zm0 1.75c-4.4 0-8 2.56-8 5.71V21h16v-1.29c0-3.15-3.6-5.71-8-5.71Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8V7a5 5 0 0 1 10 0v1h2.1c.99 0 1.8.76 1.9 1.74l.84 8.48A2.75 2.75 0 0 1 19.1 21H4.9a2.75 2.75 0 0 1-2.74-2.78L3 9.74A1.9 1.9 0 0 1 4.9 8H7Zm2 0h6V7a3 3 0 0 0-6 0v1Z" />
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

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 19.5 3.5 12 11 4.5l1.42 1.42-5.08 5.08H20.5v2H8.34l5.08 5.08L11 19.5Z" />
    </svg>
  );
}

function StarsRow() {
  return (
    <span className="shell-stars" aria-hidden="true">
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
    </span>
  );
}

function LeafDividerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4c2.5 0 4.7.8 6.4 2.3-1.7 4.2-4.1 7.1-7.3 8.7-1.3.7-2.7 1.1-4.2 1.3.5-1.4 1.1-2.8 2-4.1 1.4-2.1 3.1-3.9 5.1-5.5-2.5 1.1-4.8 2.7-6.8 4.7-.8-.7-1.4-1.6-1.8-2.7C6.6 6.6 9 4 12 4Z" />
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

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.4 5.3c-4.88.1-8.67 1.85-11.02 4.4C5 12.41 4.38 15.67 4.5 19c3.31.11 6.57-.5 9.31-2.88 2.54-2.22 4.29-6 4.4-10.82-.89 2.17-2.3 4.05-4.26 5.7-1.8 1.52-4.01 2.69-6.7 3.43 2.8-1.71 5.14-3.77 7.01-6.2 1.36-1.77 2.42-3.73 4.14-7.93Z" />
    </svg>
  );
}

function BowlIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10h16a8 8 0 0 1-16 0Zm2 0a6 6 0 0 0 12 0H6Zm1.4 9.5h9.2v1.5H7.4v-1.5Z" />
    </svg>
  );
}

function RabbitIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.2 6.7c-.7-2-.3-4.8 1.8-5.7.9 1.7 1.1 3.7.6 5.5-.4 1.5-1.3 2.8-2.4 4 .2-.9.2-2.1 0-3.8Zm7.8-.2c1.8 1 2.6 3.3 2 5.2-.8 2.5-3 4.6-5.7 5.2-3.9.9-7.7-1.3-8.2-4.7-.3-2.1.7-4.2 2.4-5.6.8-.7 1.7-1.2 2.7-1.5 1.8-.5 3.8-.3 5.4.4.5.2 1 .6 1.4 1Zm-4.2 2.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

function RecycleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8.6 4.8 2.1 3.7H6.7l1.9-3.7Zm4.7 0 2.1 3.7h-4.1l2-3.7Zm1.4 4.8 3.6 6.2H14l2.2-6.2ZM5 11.2l3.7 6.4H5.1a2.2 2.2 0 0 1-1.9-3.3l1.8-3.1Zm11.2 6.4-3.5-6.1 2.2-3.8 4 6.8a2.2 2.2 0 0 1-1.9 3.1h-.8Z" />
    </svg>
  );
}

function LeafBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.6 4.9c-4.7.1-8.4 1.8-10.7 4.2C5.2 11.8 4.6 15 4.7 18.2c3.2.1 6.4-.5 9.1-2.8 2.4-2.1 4.1-5.7 4.2-10.5-.9 2.1-2.3 3.9-4.2 5.4-1.7 1.4-3.8 2.5-6.3 3.2 2.6-1.6 4.9-3.5 6.7-5.8 1.3-1.7 2.3-3.6 4.4-7.8Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 12.25a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm7.2.1a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4ZM2.7 19v-.8c0-2.4 2.9-4.4 5.8-4.4S14.2 15.8 14.2 18.2v.8H2.7Zm10.5 0v-.6c0-.9-.2-1.7-.6-2.4 1 .1 2 .4 2.8.9.8.6 1.4 1.4 1.4 2.1v0H13.2Z" />
    </svg>
  );
}

function StarBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 2.8 5.7 6.3.9-4.6 4.4 1.1 6.4L12 17.9 6.4 20.4l1.1-6.4L2.9 9.6l6.3-.9L12 3Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 19 6.3v5.1c0 4.6-3.1 8.7-7 9.8-3.9-1.1-7-5.2-7-9.8V6.3L12 3.5Zm-1 10.7 4.8-4.8-1.4-1.4-3.4 3.4-1.5-1.5-1.4 1.4 2.9 2.9Z" />
    </svg>
  );
}
