"use client";

<<<<<<< HEAD
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  shellCopy,
  type ShellLocale,
  type ShellMode,
  type ShellPalette,
} from "./translations";
import {
  trainingLandingCopy,
  type TrainingLandingCopy,
  type TrainingShellState,
} from "../training/trainingLandingCopy";
=======
import { useState, type ReactNode } from "react";
import { ShellLogo } from "./ShellLogo";
import { shellCopy, type ShellLocale } from "./translations";
>>>>>>> e5725b8 (feat: integrate ShellLogo component and enhance application shell styles)
import "./application-shell.css";
import "../training/training-landing.css";

const STORAGE_KEYS = {
  locale: "phekong-language",
  mode: "phekong-mode",
  palette: "phekong-palette",
} as const;

const PREFERENCE_EVENT = "phekong-preferences-changed";
const SERVER_PREFERENCE_SNAPSHOT = "en|light|earth";

function getPreferenceSnapshot() {
  if (typeof window === "undefined") return SERVER_PREFERENCE_SNAPSHOT;

  try {
    const savedLocale = window.localStorage.getItem(STORAGE_KEYS.locale);
    const savedMode = window.localStorage.getItem(STORAGE_KEYS.mode);
    const savedPalette = window.localStorage.getItem(STORAGE_KEYS.palette);
    const locale: ShellLocale = savedLocale === "zh" ? "zh" : "en";
    const mode: ShellMode =
      savedMode === "dark" ||
      (savedMode !== "light" &&
        (window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false))
        ? "dark"
        : "light";
    const palette: ShellPalette =
      savedPalette === "ocean" || savedPalette === "botanical" ? savedPalette : "earth";

    return `${locale}|${mode}|${palette}`;
  } catch {
    return SERVER_PREFERENCE_SNAPSHOT;
  }
}

<<<<<<< HEAD
function subscribeToPreferences(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(PREFERENCE_EVENT, onStoreChange);
=======
export function ApplicationShell({
  children,
  locale = "en",
  state = "ready",
  activeRoute = "home",
  showStatePanel = true,
}: ApplicationShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = shellCopy[locale];
  const shellContent = children ?? (!showStatePanel ? <PublicMvpContent /> : null);
>>>>>>> 77a3722 (feat: wire home page to application shell)

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(PREFERENCE_EVENT, onStoreChange);
  };
}

function writePreference(key: (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS], value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Browser privacy settings may block persistence; the page remains usable.
  }
  window.dispatchEvent(new Event(PREFERENCE_EVENT));
}

const navigation = [
  { key: "home", href: "#main-content" },
  { key: "about", href: "#shell-anatomy" },
  { key: "products", href: "#shell-anatomy" },
  { key: "services", href: "#state-lab" },
  { key: "contact", href: "#footer" },
] as const;

export function ApplicationShell() {
  const preferenceSnapshot = useSyncExternalStore(
    subscribeToPreferences,
    getPreferenceSnapshot,
    () => SERVER_PREFERENCE_SNAPSHOT,
  );
  const [locale, mode, palette] = preferenceSnapshot.split("|") as [
    ShellLocale,
    ShellMode,
    ShellPalette,
  ];
  const [shellState, setShellState] = useState<TrainingShellState>("ready");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = shellCopy[locale];
  const landingCopy = trainingLandingCopy[locale];

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.palette = palette;
    root.dataset.mode = mode;
    root.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale, mode, palette]);

  const navLinks = navigation.map(({ key, href }) => ({
    href,
    label: copy[key],
  }));

  return (
    <div className="phekong-canvas">
<<<<<<< HEAD
      <a className="phekong-skip-link" href="#main-content">
        {copy.skip}
      </a>

      <div className="phekong-prototype-bar" role="status">
        <div className="phekong-prototype-bar__inner">
          <span>
            <strong>{copy.visionLabel}</strong> · {copy.pipeline}
          </span>
          <div className="phekong-utility-controls" aria-label={copy.displayPreferences}>
            <label>
              <span className="phekong-sr-only">{copy.paletteLabel}</span>
              <select
                aria-label={copy.paletteLabel}
                className="phekong-utility-control"
                value={palette}
                onChange={(event) =>
                  writePreference(STORAGE_KEYS.palette, event.target.value)
                }
              >
                <option value="earth">{copy.paletteEarth}</option>
                <option value="ocean">{copy.paletteOcean}</option>
                <option value="botanical">{copy.paletteBotanical}</option>
              </select>
            </label>
            <button
              aria-label={mode === "dark" ? copy.lightMode : copy.darkMode}
              className="phekong-utility-control phekong-icon-toggle"
              title={mode === "dark" ? copy.lightMode : copy.darkMode}
              type="button"
              onClick={() =>
                writePreference(STORAGE_KEYS.mode, mode === "dark" ? "light" : "dark")
              }
            >
              <span aria-hidden="true">{mode === "dark" ? "☀" : "☾"}</span>
            </button>
            <button
              aria-label={copy.languageSwitch}
              className="phekong-utility-control"
              type="button"
              onClick={() =>
                writePreference(STORAGE_KEYS.locale, locale === "en" ? "zh" : "en")
              }
            >
              {copy.languageControl}
            </button>
          </div>
        </div>
      </div>

      <header className="phekong-site-header" aria-label={copy.headerAria}>
        <div className="phekong-header-inner">
          <a className="phekong-brand" href="#main-content" aria-label={copy.brandAria}>
            <span className="phekong-brand-mark" aria-hidden="true" />
            <span className="phekong-brand-copy">
              <strong>Phekong</strong>
              <span>{copy.wellnessCentre}</span>
            </span>
=======
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#" aria-label={`Phekong ${t.centre}`}>
            <ShellLogo />
            <span className="brand-copy"><strong>Phekong</strong><span>{t.centre}</span></span>
>>>>>>> e5725b8 (feat: integrate ShellLogo component and enhance application shell styles)
          </a>

          <nav className="phekong-desktop-nav" aria-label={copy.navAria}>
            <ul>
              {navLinks.map(({ href, label }, index) => (
                <li key={label}>
                  <a
                    className="phekong-nav-link"
                    href={href}
                    aria-current={index === 0 ? "page" : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

<<<<<<< HEAD
          <div className="phekong-header-actions">
            <a className="phekong-button phekong-button--primary" href="#footer">
              {copy.contactPhekong}
            </a>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? copy.menuClose : copy.menuOpen}
              className="phekong-button phekong-button--ghost phekong-menu-button"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
=======
          <div className="header-actions">
            <a className="button button-primary" href="#contact">{t.cta}</a>
            <button className="menu-button" type="button"
              aria-expanded={menuOpen} aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(value => !value)}>
              {menuOpen ? "x" : "menu"}
>>>>>>> 77a3722 (feat: wire home page to application shell)
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="phekong-mobile-drawer" id="mobile-navigation">
            <nav aria-label={copy.mobileNavAria}>
              <ul>
                {navLinks.map(({ href, label }, index) => (
                  <li key={label}>
                    <a
                      className="phekong-nav-link"
                      href={href}
                      aria-current={index === 0 ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className="phekong-button phekong-button--primary"
                href="#footer"
                onClick={() => setMenuOpen(false)}
              >
                {copy.contactPhekong}
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main-content">
        <div className="training-content">
          <TrainingHero
            copy={landingCopy}
            onPreviewError={() => {
              setShellState("error");
              const stateLab = document.getElementById("state-lab");
              if (typeof stateLab?.scrollIntoView === "function") {
                stateLab.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
<<<<<<< HEAD
          <ShellAnatomy copy={landingCopy} />
          <ShellStateLab
            copy={landingCopy}
            state={shellState}
            onStateChange={setShellState}
          />
        </div>
        <ReviewChecklist copy={landingCopy} />
=======
        )}

        {shellContent}
>>>>>>> 77a3722 (feat: wire home page to application shell)
      </main>

      <footer className="phekong-footer" id="footer">
        <div className="phekong-footer__inner">
          <div>
            <h2>
              Phekong <span>{copy.wellnessCentre}</span>
            </h2>
            <p className="phekong-footer__intro">{copy.footerIntro}</p>
          </div>
          <FooterColumn
            title={copy.explore}
            links={[
              [copy.home, "#main-content"],
              [copy.about, "#shell-anatomy"],
              [copy.products, "#shell-anatomy"],
            ]}
          />
          <FooterColumn
            title={copy.support}
            links={[
              [copy.contact, "#footer"],
              [copy.accessibility, "#footer"],
              [copy.privacy, "#footer"],
            ]}
          />
          <FooterColumn
            title={copy.futureRoutes}
            links={[
              [copy.booking, "#state-lab"],
              [copy.customerAccount, "#state-lab"],
              [copy.checkout, "#state-lab"],
            ]}
          />
        </div>
        <div className="phekong-footer__bottom">
          <span>{copy.copyright}</span>
          <span>{copy.confidential}</span>
        </div>
      </footer>
    </div>
  );
}

<<<<<<< HEAD
export function TrainingHero({
  copy,
  onPreviewError,
}: {
  copy: TrainingLandingCopy;
  onPreviewError?: () => void;
}) {
=======
function PublicMvpContent() {
  return (
    <section className="home-hero" id="home">
      <p className="eyebrow">PHEKONG WELLNESS CENTRE</p>
      <h1>Commerce and booking platform</h1>
      <p className="intro">
        The Sankofa Digital MVP foundation is active. Product discovery, bookings,
        inventory and administrative tools will be delivered through controlled milestones.
      </p>
      <div className="status-card">
        <strong>Project status</strong>
        <span>Architecture approved. Application scaffold in progress.</span>
      </div>
    </section>
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

>>>>>>> 77a3722 (feat: wire home page to application shell)
  return (
    <section className="training-hero" aria-labelledby="training-hero-title">
      <div>
        <span className="training-eyebrow">{copy.foundation}</span>
        <h1 id="training-hero-title">{copy.heroTitle}</h1>
        <p>{copy.heroBody}</p>
        <div className="training-hero__actions">
          <a className="phekong-button phekong-button--primary" href="#shell-anatomy">
            {copy.exploreShell}
          </a>
          <button
            className="phekong-button phekong-button--ghost"
            type="button"
            onClick={onPreviewError}
          >
            {copy.previewError}
          </button>
        </div>
        <p className="training-micro-note">{copy.futureNote}</p>
      </div>

      <div className="training-hero__visual" role="img" aria-label={copy.heroVisualAria}>
        <div className="training-hero__card">
          <div>
            <strong>{copy.publicReady}</strong>
            <span>{copy.publicReadySub}</span>
          </div>
          <span className="training-status-dot" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export function ShellAnatomy({ copy }: { copy: TrainingLandingCopy }) {
  return (
    <section className="training-anatomy" id="shell-anatomy" aria-labelledby="anatomy-title">
      <div className="training-section-heading">
        <h2 id="anatomy-title">{copy.shellOwns}</h2>
        <p>{copy.shellOwnsBody}</p>
      </div>
      <div className="training-anatomy__grid">
        {copy.anatomy.map(([number, title, body]) => (
          <article className="training-anatomy__card" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ShellStateLab({
  copy,
  state,
  onStateChange,
}: {
  copy: TrainingLandingCopy;
  state?: TrainingShellState;
  onStateChange?: (state: TrainingShellState) => void;
}) {
  const [localState, setLocalState] = useState<TrainingShellState>("ready");
  const activeState = state ?? localState;
  const setState = onStateChange ?? setLocalState;
  const [label, title, body] = copy.states[activeState];

  return (
    <section className="training-state-lab" id="state-lab" aria-labelledby="state-lab-title">
      <div>
        <h2 id="state-lab-title">{copy.stateLab}</h2>
        <p>{copy.stateLabBody}</p>
        <div className="training-state-controls" aria-label={copy.stateControlsAria}>
          {(Object.keys(copy.states) as TrainingShellState[]).map((stateKey) => (
            <button
              aria-pressed={activeState === stateKey}
              key={stateKey}
              type="button"
              onClick={() => setState(stateKey)}
            >
              {copy.states[stateKey][0]}
            </button>
          ))}
        </div>
      </div>
      <div
        className="training-state-preview"
        aria-live="polite"
        aria-busy={activeState === "loading"}
      >
        <div>
          {activeState === "loading" ? (
            <span className="training-spinner" aria-hidden="true" />
          ) : null}
          <h3 className={activeState === "error" ? "training-state-preview__error" : undefined}>
            {title}
          </h3>
          <p>{body}</p>
          {activeState === "empty" ? (
            <a className="phekong-button phekong-button--ghost" href="#main-content">
              {copy.returnHome}
            </a>
          ) : null}
          {activeState === "error" ? (
            <button
              className="phekong-button phekong-button--primary"
              type="button"
              onClick={() => setState("ready")}
            >
              {copy.tryAgain}
            </button>
          ) : null}
          <span className="phekong-sr-only">{label}</span>
        </div>
      </div>
    </section>
  );
}

export function ReviewChecklist({ copy }: { copy: TrainingLandingCopy }) {
  const [open, setOpen] = useState(true);

  return (
    <aside className="training-review" aria-label={copy.reviewAria}>
      <button
        aria-controls="training-review-body"
        aria-expanded={open}
        className="training-review__toggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{copy.reviewChecklist}</span>
        <span aria-hidden="true">{open ? "▾" : "▴"}</span>
      </button>
      {open ? (
        <div className="training-review__body" id="training-review-body">
          <ul>
            {copy.reviewItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <div>
      <h2>{title}</h2>
      <ul className="phekong-footer__list">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
