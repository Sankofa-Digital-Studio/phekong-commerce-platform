import Image from "next/image";

import { AboutCard } from "../AboutCard/AboutCard";
import styles from "./cta-banner.module.css";
import Link from "next/link";

export type CTABannerProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  cardVariant?: "default" | "elevated" | "outlined" | "ghost";
  cardPadding?: "none" | "sm" | "md" | "lg";
};

export function CTABanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  cardVariant = "elevated",
  cardPadding = "md",
}: CTABannerProps) {
  return (
    <AboutCard
      variant={cardVariant}
      padding={cardPadding}
      className={styles.bannerCard}
    >
      <section className={styles.banner} aria-labelledby="cta-banner-title">
        <div className={styles.imageWrap}>
          <Image
            src="/images/cta-tea.png"
            alt="Herbal wellness tea with natural leaves"
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
            className={styles.image}
          />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title} id="cta-banner-title">
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <Link
              href={primaryHref}
              className="phekong-button phekong-button-primary phekong-button-medium"
            >
              {primaryLabel}
            </Link>

            <Link
              href={secondaryHref}
              className="phekong-button phekong-button-secondary phekong-button-medium"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </AboutCard>
  );
}
