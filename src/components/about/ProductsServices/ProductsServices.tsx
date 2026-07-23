import { Card } from "../Card/Card";
import styles from "./products-services.module.css";
import Image from 'next/image';

export type ProductsServicesPanel = {
  title: string;
  items: string[];
  imageLabel: string;
};

export type ProductsServicesProps = {
  title: string;
  panels: ProductsServicesPanel[];
  cardVariant?: "default" | "elevated" | "outlined" | "ghost";
  cardPadding?: "none" | "sm" | "md" | "lg";
  imageSize?: "sm" | "md" | "lg";
};

export function ProductsServices({
  title,
  panels,
  cardVariant = "elevated",
  cardPadding = "md",
  imageSize = "md",
}: ProductsServicesProps) {
  const imageSizes = {
    sm: { width: 120, height: 120 },
    md: { width: 160, height: 160 },
    lg: { width: 200, height: 200 },
  };

  const size = imageSizes[imageSize];

  return (
    <section
      className={styles.section}
      aria-labelledby="products-services-title"
    >
      <div className={styles.header}>
        <h2 className={styles.title} id="products-services-title">
          {title}
        </h2>
        <div className={styles.titleUnderline} />
      </div>

      <div className={styles.grid}>
        {panels.map((panel) => (
          <Card
            key={panel.title}
            variant={cardVariant}
            padding={cardPadding}
            className={styles.card}
          >
            <h3 className={styles.panelTitle}>{panel.title}</h3>
            <div className={styles.panelContent}>
              <ul className={styles.list}>
                {panel.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div
                className={styles.imageWrap}
                style={{
                  width: size.width,
                  height: size.height,
                  position: 'relative', 
                }}
              >
                <Image
                  src={`/images/${panel.imageLabel}`}
                  alt={panel.title}
                  fill
                  className={styles.image}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}