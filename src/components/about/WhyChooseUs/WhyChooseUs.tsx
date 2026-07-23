import { Card } from "../Card/Card";
import styles from "./why-choose-us.module.css";
import Image from 'next/image';

export type WhyChooseUsItem = {
  iconLabel: string;
  iconSrc: string; 
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
        <div className={styles.titleUnderline} />
        <p className={styles.intro}>{intro}</p>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <Card
            key={item.title}
            variant={cardVariant}
            padding={cardPadding}
            className={styles.card}
          >
            <div className={styles.iconWrap}>
              <Image src={item.iconSrc} alt={item.title} width={48} height={48} />
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}