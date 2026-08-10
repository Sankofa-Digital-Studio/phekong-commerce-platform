import Link from "next/link";
import "./commerce-route-hero.css";

type RouteTone = "earth" | "botanical" | "gold";

interface RouteHeroAction {
  href: string;
  label: string;
}

export interface CommerceRouteHeroProps {
  pageLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: RouteHeroAction;
  secondaryAction: RouteHeroAction;
  proofPoints: ReadonlyArray<string>;
  visualKicker: string;
  visualTitle: string;
  visualSteps: ReadonlyArray<string>;
  tone?: RouteTone;
}

export function CommerceRouteHero({
  pageLabel,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  proofPoints,
  visualKicker,
  visualTitle,
  visualSteps,
  tone = "earth",
}: CommerceRouteHeroProps) {
  return (
    <>
      <nav className="commerce-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{pageLabel}</span>
      </nav>

      <section className={`commerce-route-hero commerce-route-hero--${tone}`} aria-labelledby={`${pageLabel.toLowerCase()}-title`}>
        <div className="commerce-route-hero__copy">
          <p className="commerce-kicker">{eyebrow}</p>
          <h1 id={`${pageLabel.toLowerCase()}-title`}>{title}</h1>
          <p className="commerce-route-hero__lede">{description}</p>
          <div className="commerce-route-hero__actions">
            <Link className="commerce-action commerce-action--primary" href={primaryAction.href}>
              {primaryAction.label}
              <ArrowIcon />
            </Link>
            <Link className="commerce-action commerce-action--secondary" href={secondaryAction.href}>
              {secondaryAction.label}
            </Link>
          </div>
          <ul className="commerce-proof-list" aria-label={`${pageLabel} assurances`}>
            {proofPoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>

        <div className="commerce-route-hero__visual" aria-label={`${visualTitle}: ${visualSteps.join(", ")}`}>
          <span className="commerce-route-hero__halo commerce-route-hero__halo--one" aria-hidden="true" />
          <span className="commerce-route-hero__halo commerce-route-hero__halo--two" aria-hidden="true" />
          <p className="commerce-route-hero__visual-kicker">{visualKicker}</p>
          <h2>{visualTitle}</h2>
          <ol>
            {visualSteps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 5.5 19.5 12 13 18.5l-1.4-1.4 4.1-4.1H4.5v-2h11.2l-4.1-4.1L13 5.5Z" /></svg>;
}
