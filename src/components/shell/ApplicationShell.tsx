"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { catalogueProducts, ProductCatalogue, type ProductCatalogueState } from "../catalogue/ProductCatalogue";
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
    ["about", t.about],
    ["products", t.products],
    ["services", t.services],
    ["contact", t.contact],
  ] as const;

  return (
    <div className="phekong-canvas">
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#main-content" aria-label={t.brandAria}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-copy">
              <strong>Phekong</strong>
              <span>{t.wellnessCentre}</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label={t.navAria}>
            {links.map(([route, label]) => (
              <a
                key={route}
                className="nav-link"
                href={`#${route}`}
                aria-current={route === activeRoute ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="button button-primary" href="#contact">
              {t.contactPhekong}
            </a>
            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label={t.mobileNavAria}>
            {links.map(([route, label]) => (
              <a
                key={route}
                className="nav-link"
                href={`#${route}`}
                aria-current={route === activeRoute ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main
        id="main-content"
        className="shell-main"
        aria-busy={state === "loading" ? "true" : "false"}
      >
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
  const activeProducts = catalogueProducts.filter((product) => product.active);
  const lowStockCount = activeProducts.filter(
    (product) => product.stockQuantity > 0 && product.stockQuantity <= product.lowStockThreshold,
  ).length;
  const outOfStockCount = activeProducts.filter((product) => product.stockQuantity === 0).length;

  return (
    <div className="shell-surface">
      <section className="shell-hero" id="home">
        <div className="shell-hero__copy">
          <p className="shell-hero__eyebrow">PHEKONG WELLNESS CENTRE</p>
          <h1>Commerce and booking platform</h1>
          <p className="shell-hero__intro">
            The public shell is live. Browse active products, keep stock visibility clear, and
            preserve room for future booking and checkout milestones.
          </p>
          <div className="shell-hero__actions">
            <Button
              size="medium"
              variant="primary"
              type="button"
              onClick={() => {
                window.location.hash = "#products";
              }}
            >
              Browse products
            </Button>
            <Button
              size="medium"
              variant="secondary"
              type="button"
              onClick={() => {
                window.location.hash = "#contact";
              }}
            >
              Contact Phekong
            </Button>
          </div>
        </div>

        <aside className="shell-hero__panel" aria-label="Public read model summary">
          <p className="shell-hero__panel-label">Public read model</p>
          <h2>Ready for active product browsing</h2>
          <p>
            Product prices and stock signals are visible without exposing checkout or admin
            controls.
          </p>
          <dl className="shell-hero__metrics">
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
            <div>
              <dt>Recovery path</dt>
              <dd>Contact</dd>
            </div>
          </dl>
        </aside>
      </section>

      <ProductCatalogue state={catalogueState} onRetry={onRetry} />
    </div>
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
