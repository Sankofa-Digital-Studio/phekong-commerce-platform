import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '../../components/routes/Breadcrumbs';
import shared from '../../components/routes/route-page.module.css';
import { ApplicationShell } from '../../components/shell/ApplicationShell';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'A modern public services page that maps the kinds of support and implementation lanes the commerce shell can present.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <ApplicationShell>
      <main className={`${shared.page} ${styles.flow}`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services' },
          ]}
        />

        <section className={shared.hero}>
          <p className={shared.eyebrow}>Services</p>
          <h1 className={shared.title}>Service lanes designed around the catalogue, not around noise.</h1>
          <p className={shared.lede}>
            This page now mirrors the prototype's strongest service cues: product presentation, booking readiness, public trust, and a route structure that feels easy to follow.
          </p>
          <div className={shared.metaRow}>
            <span className={shared.chip}>Implementation-ready</span>
            <span className={shared.chip}>Route-aware</span>
            <span className={shared.chip}>Preview-safe</span>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="service-lanes">
          <div>
            <h2 className={shared.sectionTitle} id="service-lanes">
              Four public lanes
            </h2>
            <p className={shared.sectionLead}>
              The live brand still needs clear service framing, and the strongest pattern from the prototype is to keep the lanes short and obvious.
            </p>
          </div>

          <div className={styles.serviceGrid}>
            <article className={styles.serviceCard}>
              <span className={styles.serviceTag}>Launch</span>
              <h3 className={styles.serviceTitle}>Public page setup</h3>
              <p className={styles.serviceText}>
                Structure and present the first impression: route titles, summaries, entry points, and the public navigation shape.
              </p>
            </article>
            <article className={styles.serviceCard}>
              <span className={styles.serviceTag}>Catalogue</span>
              <h3 className={styles.serviceTitle}>Approved product framing</h3>
              <p className={styles.serviceText}>
                Keep catalogue pages consistent so visitors can compare products without jumping through mismatched layouts.
              </p>
            </article>
            <article className={styles.serviceCard}>
              <span className={styles.serviceTag}>Governance</span>
              <h3 className={styles.serviceTitle}>Route and metadata hygiene</h3>
              <p className={styles.serviceText}>
                Maintain canonical URLs, crawl behavior, and the public boundaries that keep pre-release states out of search.
              </p>
            </article>
            <article className={styles.serviceCard}>
              <span className={styles.serviceTag}>Support</span>
              <h3 className={styles.serviceTitle}>Post-launch consistency</h3>
              <p className={styles.serviceText}>
                Make it easy to keep pages aligned as new sections, policies, or product stories are added later.
              </p>
            </article>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="service-matrix">
          <div>
            <h2 className={shared.sectionTitle} id="service-matrix">
              What the page helps different people do
            </h2>
          </div>

          <div className={styles.serviceMatrix}>
            <article className={styles.matrixCard}>
              <h3 className={styles.matrixHeading}>For shoppers</h3>
              <p className={styles.matrixText}>Find a route that explains the catalogue quickly and makes the next click obvious.</p>
            </article>
            <article className={styles.matrixCard}>
              <h3 className={styles.matrixHeading}>For operators</h3>
              <p className={styles.matrixText}>See the service lanes in a way that is simple to maintain without introducing duplicate public pages.</p>
            </article>
            <article className={styles.matrixCard}>
              <h3 className={styles.matrixHeading}>For reviewers</h3>
              <p className={styles.matrixText}>Check that the public surface stays honest about what is live, what is pending, and what is still preview-only.</p>
            </article>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="service-next">
          <div>
            <h2 className={shared.sectionTitle} id="service-next">
              Related routes
            </h2>
          </div>

          <div className={shared.linkGrid}>
            <Link className={shared.linkCard} href="/products">
              <span className={shared.linkHeading}>Products</span>
              <span className={shared.linkText}>Move from service framing into the approved product catalogue.</span>
            </Link>
            <Link className={shared.linkCard} href="/about">
              <span className={shared.linkHeading}>About</span>
              <span className={shared.linkText}>Review the route principles that shape the public shell.</span>
            </Link>
            <Link className={shared.linkCard} href="/contact">
              <span className={shared.linkHeading}>Contact</span>
              <span className={shared.linkText}>Follow the public contact lanes when a route needs human confirmation.</span>
            </Link>
          </div>
        </section>
      </main>
    </ApplicationShell>
  );
}
