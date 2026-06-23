"use client";

import { useState, type ReactNode } from "react";
import { shellCopy, type ShellLocale } from "./translations";
import "./application-shell.css";

export type ShellState = "ready" | "loading" | "empty" | "error";

export interface ApplicationShellProps {
  children?: ReactNode;
  locale?: ShellLocale;
  state?: ShellState;
  activeRoute?: "home" | "about" | "products" | "services" | "contact";
}

export function ApplicationShell({
  children,
  locale = "en",
  state = "ready",
  activeRoute = "home"
}: ApplicationShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = shellCopy[locale];

  const links = [
    ["home", t.home],
    ["about", t.about],
    ["products", t.products],
    ["services", t.services],
    ["contact", t.contact]
  ] as const;

  return (
    <div className="phekong-canvas">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#" aria-label={`Phekong ${t.centre}`}>
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-copy"><strong>Phekong</strong><span>{t.centre}</span></span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(([route, label]) => (
              <a key={route} className="nav-link" href={`#${route}`}
                aria-current={route === activeRoute ? "page" : undefined}>{label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <a className="button button-primary" href="#contact">{t.cta}</a>
            <button className="menu-button" type="button"
              aria-expanded={menuOpen} aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(value => !value)}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {links.map(([route, label]) => (
              <a key={route} className="nav-link" href={`#${route}`}
                aria-current={route === activeRoute ? "page" : undefined}
                onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content" className="shell-main">
        <ShellStatePanel state={state} locale={locale} />
        {children}
      </main>

      <footer className="site-footer">
        <strong>Phekong {t.centre}</strong>
        <span>© 2026 · Sankofa Digital</span>
      </footer>
    </div>
  );
}

function ShellStatePanel({ state, locale }: { state: ShellState; locale: ShellLocale }) {
  const t = shellCopy[locale];
  const copy = {
    ready: [t.readyTitle, t.readyBody],
    loading: [t.loadingTitle, t.loadingBody],
    empty: [t.emptyTitle, t.emptyBody],
    error: [t.errorTitle, t.errorBody]
  }[state];

  return (
    <section className={`state-panel state-${state}`} aria-live="polite">
      {state === "loading" && <span className="spinner" aria-hidden="true" />}
      <h1>{copy[0]}</h1>
      <p>{copy[1]}</p>
    </section>
  );
}
