import { AboutCard } from "../AboutCard/AboutCard";
import styles from "./why-choose-us.module.css";
import Image from "next/image";

type ImageContent = {
  src: string;
  alt: string;
};

export type WhyChooseUsItem = {
  image: ImageContent;
  title: string;
  description: string;
};

export type WhyChooseUsProps = {
  title: string;
  intro: string;
  items: WhyChooseUsItem[];
  cardVariant?: "default" | "elevated" | "outlined" | "ghost";
  cardPadding?: "none" | "sm" | "md" | "lg";
};

export function WhyChooseUs({
  title,
  intro,
  items,
  cardVariant = "elevated",
  cardPadding = "md",
}: WhyChooseUsProps) {
  return (
    <section className={styles.section} aria-labelledby="why-choose-us-title">
      <div className={styles.header}>
        <h2 className={styles.title} id="why-choose-us-title">
          {title}
        </h2>
        <div className={styles.titleUnderline} aria-hidden="true" />
        <p className={styles.intro}>{intro}</p>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <AboutCard
            key={item.title}
            variant={cardVariant}
            padding={cardPadding}
            className={styles.card}
          >
            <div className={styles.iconWrap}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={48}
                height={48}
              />
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.description}</p>
          </AboutCard>
        ))}
      </div>
    </section>
  );
}
