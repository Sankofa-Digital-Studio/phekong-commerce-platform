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
  activeRoute = "home",
}: ApplicationShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = shellCopy[locale];

  const links = [
    ["home", t.home],
    ["about", t.about],
    ["products", t.products],
    ["services", t.services],
    ["contact", t.contact],
  ] as const;

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="phekong-canvas">
      <a className="skip-link" href="#main-content">
        {t.skipToContent}
      </a>

      <header className="site-header">
        <div className="header-inner">
          <a
            className="brand"
            href="#home"
            aria-label={`Phekong ${t.centre}`}
          >
            <span className="brand-mark" aria-hidden="true" />

            <span className="brand-copy">
              <strong>Phekong</strong>
              <span>{t.centre}</span>
            </span>
          </a>

          <nav
            className="desktop-nav"
            aria-label={t.primaryNavigation}
          >
            {links.map(([route, label]) => (
              <a
                key={route}
                className="nav-link"
                href={`#${route}`}
                aria-current={
                  route === activeRoute ? "page" : undefined
                }
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a
              className="button button-primary"
              href="#contact"
            >
              {t.cta}
            </a>

            <button
              className="menu-button"
              type="button"
              aria-expanded={menuOpen ? "true" : "false" }
              aria-controls="mobile-navigation"
              aria-label={
                menuOpen ? t.closeMenu : t.openMenu
              }
              onClick={() => {
                setMenuOpen((currentValue) => !currentValue);
              }}
            >
              <span aria-hidden="true">
                {menuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={t.mobileNavigation}
          hidden={!menuOpen}
        >
          {links.map(([route, label]) => (
            <a
              key={route}
              className="nav-link"
              href={`#${route}`}
              aria-current={
                route === activeRoute ? "page" : undefined
              }
              onClick={closeMobileMenu}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main
        id="main-content"
        className="shell-main"
        aria-busy={state === "loading" ? "true" : "false"}
      >
        <ShellStatePanel
          state={state}
          locale={locale}
        />

        {children}
      </main>

      <footer className="site-footer">
        <strong>
          Phekong {t.centre}
        </strong>

        <span>© 2026 · Sankofa Digital</span>
      </footer>
    </div>
  );
}

function ShellStatePanel({
  state,
  locale,
}: {
  state: ShellState;
  locale: ShellLocale;
}) {
  const t = shellCopy[locale];

  const copy: Record<ShellState, readonly [string, string]> = {
    ready: [t.readyTitle, t.readyBody],
    loading: [t.loadingTitle, t.loadingBody],
    empty: [t.emptyTitle, t.emptyBody],
    error: [t.errorTitle, t.errorBody],
  };

  const [title, body] = copy[state];

  return (
    <section
      className={`state-panel state-${state}`}
      aria-live={state === "error" ? "assertive" : "polite"}
      aria-atomic="true"
    >
      {state === "loading" && (
        <span
          className="spinner"
          aria-hidden="true"
        />
      )}

      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
}