import styles from "./our-values.module.css";
import Image from 'next/image';

type ImageContent = {
  src: string;
  alt: string;
};

export type ValueItem = {
  image: ImageContent;
  title: string;
  description: string;
};

export type OurValuesProps = {
  title: string;
  values: ValueItem[];
};

export function OurValues({ title, values }: OurValuesProps) {
  return (
    <section className={styles.section} aria-labelledby="our-values-title">
      <div className={styles.header}>
        <h2 className={styles.title} id="our-values-title">
          {title}
        </h2>
        <div
  className={styles.titleUnderline}
  aria-hidden="true"
/>
      </div>

      <div className={styles.grid}>
        {values.map((value) => (
          <article className={styles.card} key={value.title}>
            <div className={styles.imageWrap}>
      <Image
  src={value.image.src}
  alt={value.image.alt}
  fill
  sizes="56px"
  className={styles.image}
  style={{ objectFit: "contain" }}
/>
            </div>
            <h3 className={styles.cardTitle}>{value.title}</h3>
            <p className={styles.cardText}>{value.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}