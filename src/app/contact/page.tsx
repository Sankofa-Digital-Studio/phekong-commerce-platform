import type { Metadata } from 'next';
import Link from 'next/link';

import { Breadcrumbs } from '../../components/routes/Breadcrumbs';
import shared from '../../components/routes/route-page.module.css';
import { ApplicationShell } from '../../components/shell/ApplicationShell';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'A modern public contact page that maps the fastest route to the right kind of help without claiming unsupported submission flows.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <ApplicationShell>
      <main className={`${shared.page} ${styles.flow}`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact' },
          ]}
        />

        <section className={shared.hero}>
          <p className={shared.eyebrow}>Contact</p>
          <h1 className={shared.title}>Choose the shortest path to the right team.</h1>
          <p className={shared.lede}>
            The contact route stays live even while the final submission details are being confirmed. That lets the public shell show where a message belongs without pretending the handoff is finished.
          </p>
          <div className={shared.metaRow}>
            <span className={shared.chip}>Human confirmation pending</span>
            <span className={shared.chip}>Public route live</span>
            <span className={shared.chip}>No unsupported claims</span>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="contact-lanes">
          <div>
            <h2 className={shared.sectionTitle} id="contact-lanes">
              Where different messages should go
            </h2>
            <p className={shared.sectionLead}>
              Rather than one generic inbox, the page breaks contact down into a few practical lanes so visitors can self-sort before they send anything.
            </p>
          </div>

          <div className={styles.contactGrid}>
            <article className={styles.contactCard}>
              <p className={styles.contactLabel}>Product question</p>
              <h3 className={styles.contactTitle}>Ask about an approved item</h3>
              <p className={styles.contactText}>Best for product-specific details, availability questions, or follow-up on a public catalogue page.</p>
            </article>
            <article className={styles.contactCard}>
              <p className={styles.contactLabel}>Partnership note</p>
              <h3 className={styles.contactTitle}>Share a collaboration idea</h3>
              <p className={styles.contactText}>Use this lane when the conversation is about a launch, a feature alignment, or a broader public-facing opportunity.</p>
            </article>
            <article className={styles.contactCard}>
              <p className={styles.contactLabel}>Site issue</p>
              <h3 className={styles.contactTitle}>Report a route problem</h3>
              <p className={styles.contactText}>Useful for broken navigation, copy that needs correction, or a page that is not reflecting the current public state.</p>
            </article>
            <article className={styles.contactCard}>
              <p className={styles.contactLabel}>Status check</p>
              <h3 className={styles.contactTitle}>Confirm what is live</h3>
              <p className={styles.contactText}>A lightweight option when you need to know whether a route is preview-only, public, or still awaiting final details.</p>
            </article>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="contact-checklist">
          <div>
            <h2 className={shared.sectionTitle} id="contact-checklist">
              What to include in a message
            </h2>
          </div>

          <div className={styles.checklist}>
            <article className={styles.checklistItem}>
              <span className={styles.check} aria-hidden="true" />
              <p className={styles.checkText}>The route you were looking at so the team can reproduce the context quickly.</p>
            </article>
            <article className={styles.checklistItem}>
              <span className={styles.check} aria-hidden="true" />
              <p className={styles.checkText}>A short note about whether you need product details, a public-site fix, or a general enquiry.</p>
            </article>
            <article className={styles.checklistItem}>
              <span className={styles.check} aria-hidden="true" />
              <p className={styles.checkText}>Any useful deadline or reason the request is time-sensitive, if one exists.</p>
            </article>
          </div>
        </section>

        <section className={shared.section} aria-labelledby="contact-next">
          <div>
            <h2 className={shared.sectionTitle} id="contact-next">
              Useful routes while contact details are being finalized
            </h2>
          </div>

          <div className={shared.linkGrid}>
            <Link className={shared.linkCard} href="/products">
              <span className={shared.linkHeading}>Browse products</span>
              <span className={shared.linkText}>The fastest way to ground a product-related question in a specific page.</span>
            </Link>
            <Link className={shared.linkCard} href="/services">
              <span className={shared.linkHeading}>Review services</span>
              <span className={shared.linkText}>See the public service framing before sending a collaboration note.</span>
            </Link>
            <Link className={shared.linkCard} href="/about">
              <span className={shared.linkHeading}>About the shell</span>
              <span className={shared.linkText}>Check the route principles that explain how the public experience is organized.</span>
            </Link>
          </div>
        </section>
      </main>
    </ApplicationShell>
  );
}
