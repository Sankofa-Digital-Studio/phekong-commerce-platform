import { ApplicationShell } from "../components/shell/ApplicationShell";
import { Section } from "../components/ui/Section";
import { FeatureCard } from "../components/ui/FeatureCard";
import { landingPageContent } from "../components/ui/objects/siteContent";

export default function HomePage() {
<<<<<<< HEAD
<<<<<<< HEAD
  return <ApplicationShell />;
=======
  const { hero, features, about, services, contact } = landingPageContent;

  return (
    <ApplicationShell activeRoute="home" showStatePanel={false}>
      <section className="home-hero" id="home">
        <div className="content-wrapper">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.heading}</h1>
          <p className="intro">{hero.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">{hero.ctaText}</a>
            <a className="button button-ghost" href="#about">Learn more</a>
          </div>
        </div>
      </section>

      <Section id="about" title={about.title} intro={about.intro}>
        <div className="feature-grid">
          {features.map(feature => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Section>

      <Section id="products" title={services.title} intro={services.intro} />

      <Section id="services" title="Built for sustainable growth">
        <ul className="service-list">
          {services.items.map(item => (
            <li key={item} className="service-item">{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="contact" title={contact.title} intro={contact.description}>
        <div className="contact-panel">
          <a className="button button-primary" href="mailto:hello@sankofa.digital">
            {contact.ctaText}
          </a>
          <p className="contact-note">{contact.note}</p>
        </div>
      </Section>
    </ApplicationShell>
  );
>>>>>>> 92a5cd4 (feat: enhance HomePage layout with responsive sections and update styles)
=======
  return <ApplicationShell activeRoute="home" showStatePanel={false} />;
>>>>>>> 77a3722 (feat: wire home page to application shell)
}
