import Image from 'next/image';
import styles from './about-hero.module.css';

export type AboutHeroProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export function AboutHero({ eyebrow, title, paragraphs }: AboutHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="about-hero-title">
      <div className={styles.headerGroup}>
        <h1 className={styles.title} id="about-hero-title">
          {title}
        </h1>
        <p className={styles.eyebrow}>{eyebrow}</p>
      </div>

      <div className={styles.contentGroup}>
        <div className={styles.paragraphs}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.illustrationWrap}>
          <Image
            className={styles.illustration}
            src="/images/about-us.gif"
            alt="Illustration of the Phekong team waving"
            width={500}
            height={380}
          />
        </div>
      </div>
    </section>
  );
}