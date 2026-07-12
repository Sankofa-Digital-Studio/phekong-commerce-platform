import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '../../components/routes/Breadcrumbs';
import shared from '../../components/routes/route-page.module.css';
import { ApplicationShell } from '../../components/shell/ApplicationShell';
import styles from './page.module.css';
import { wellnessThemeContent } from '@/components/ui/objects/wellnessThemeContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'A clear public overview of the Phekong commerce shell, the route boundaries, and the principles behind the public experience.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <ApplicationShell>
      <main className={`${shared.page} ${styles.flow}`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'About' },
          ]}
        />

        <section className={shared.hero}>
          <p className={shared.eyebrow}>About Phekong</p>
          <h1 className={shared.title}>Established in Welkom, rooted in natural wellness, designed for modern commerce.</h1>
          <p className={shared.lede}>
            {wellnessThemeContent.brandStory}
          </p>
          <div className={shared.metaRow}>
            <span className={shared.chip}>Natural healing story</span>
            <span className={shared.chip}>Welkom, Free State origin</span>
            <span className={shared.chip}>Commerce-ready public shell</span>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="about-map">
          <div>
            <h2 className={shared.sectionTitle} id="about-map">
              What this page is really doing
            </h2>
            <p className={shared.sectionLead}>
              This route now uses the prototype&apos;s strongest brand signals without importing the old code: a grounded origin story, community wellness, and a clear sense of what the live storefront is for.
            </p>
          </div>

          <div className={styles.routeMap}>
            <article className={styles.routeMapCard}>
              <p className={styles.routeMapLabel}>Audience</p>
              <p className={styles.routeMapValue}>
                Shoppers who want natural products, reviewers who need clarity, and partners who need a trustworthy public brand.
              </p>
            </article>
            <article className={styles.routeMapCard}>
              <p className={styles.routeMapLabel}>Boundaries</p>
              <p className={styles.routeMapValue}>
                No unsupported medical guarantees, no hidden checkout claims, and no pretending preview-only routes are already transactional.
              </p>
            </article>
            <article className={styles.routeMapCard}>
              <p className={styles.routeMapLabel}>Experience</p>
              <p className={styles.routeMapValue}>
                Category-first discovery, stronger trust copy, and a conversion path that feels confident without becoming noisy.
              </p>
            </article>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="about-principles">
          <div>
            <h2 className={shared.sectionTitle} id="about-principles">
              Working principles
            </h2>
            <p className={shared.sectionLead}>
              The live shell should feel handcrafted, calm, and reliable. That is the same principle the prototype aimed for, but now translated into the current App Router implementation.
            </p>
          </div>

          <div className={shared.timeline}>
            <article className={shared.timelineItem}>
              <div className={shared.timelineIndex}>1</div>
              <div className={shared.timelineBody}>
                <h3 className={shared.timelineTitle}>Curate before you scale</h3>
                <p className={shared.timelineText}>
                  The first job is not volume. It is making sure the approved routes and products feel deliberate and trustworthy.
                </p>
              </div>
            </article>
            <article className={shared.timelineItem}>
              <div className={shared.timelineIndex}>2</div>
              <div className={shared.timelineBody}>
                <h3 className={shared.timelineTitle}>Show the boundary</h3>
                <p className={shared.timelineText}>
                  Each public page should tell the user what it can do right now and what still needs confirmation.
                </p>
              </div>
            </article>
            <article className={shared.timelineItem}>
              <div className={shared.timelineIndex}>3</div>
              <div className={shared.timelineBody}>
                <h3 className={shared.timelineTitle}>Leave room for the next route</h3>
                <p className={shared.timelineText}>
                  The shell should make it easy to add content without duplicating navigation, layout, or SEO behavior.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="about-next">
          <div>
            <h2 className={shared.sectionTitle} id="about-next">
              Next places to explore
            </h2>
          </div>

          <div className={shared.linkGrid}>
            <Link className={shared.linkCard} href="/products">
              <span className={shared.linkHeading}>Browse products</span>
              <span className={shared.linkText}>See the category-first catalogue surface and the approved product flow.</span>
            </Link>
            <Link className={shared.linkCard} href="/services">
              <span className={shared.linkHeading}>Review services</span>
              <span className={shared.linkText}>Read the public service framing and the routes it is prepared to support.</span>
            </Link>
            <Link className={shared.linkCard} href="/contact">
              <span className={shared.linkHeading}>Contact route</span>
              <span className={shared.linkText}>Check the public contact lanes before final submission details are confirmed.</span>
            </Link>
          </div>
        </section>
      </main>
    </ApplicationShell>
  );
}
