import Image from 'next/image';
import { Button } from "../../ui/Button";
import { Card } from "../Card/Card";
import styles from "./cta-banner.module.css";

export type CTABannerProps = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  cardVariant?: "default" | "elevated" | "outlined" | "ghost";
  cardPadding?: "none" | "sm" | "md" | "lg";
};

export function CTABanner({
  title,
  description,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  cardVariant = "elevated",
  cardPadding = "md",
}: CTABannerProps) {
  return (
    <Card
      variant={cardVariant}
      padding={cardPadding}
      className={styles.bannerCard}
    >
      <section className={styles.banner} aria-labelledby="cta-banner-title">
        <div className={styles.imageWrap}>
          <Image
            className={styles.desktopOnly}
            src="/images/cta-tea.png"
            alt="Wellness tea and leaves"
            width={640}
            height={420}
          />
          <Image
            className={styles.mobileOnly}
            src="/images/cta-tea.png"
            alt="Wellness tea and leaves"
            width={320}
            height={220}
          />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title} id="cta-banner-title">
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>
            <Button
              variant="primary"
              label={primaryLabel}
              onClick={onPrimaryClick}
            />
            <Button
              variant="secondary"
              label={secondaryLabel}
              onClick={onSecondaryClick}
            />
          </div>
        </div>
      </section>
    </Card>
  );
}