import type { Metadata } from "next";

import { Breadcrumbs } from "../../components/routes/Breadcrumbs";
import shared from "../../components/routes/route-page.module.css";
import { ApplicationShell } from "../../components/shell/ApplicationShell";
import { AboutHero } from "../../components/about/AboutHero/AboutHero";
import { WhyChooseUs } from "../../components/about/WhyChooseUs/WhyChooseUs";
import { ProductsServices } from "../../components/about/ProductsServices/ProductsServices";
import { StatsBar } from "../../components/about/StatsBar/StatsBar";
import { OurValues } from "../../components/about/OurValues/OurValues";
import { CTABanner } from "../../components/about/CtaBanner/CTABanner";
import styles from "./page.module.css";
import { aboutPageContent } from "../../components/ui/objects/aboutPageContent";

export const metadata: Metadata = {
  title: 'About Phekong Wellness Centre',
  description:
    'Learn about Phekong Wellness Centre, our Welkom roots, natural wellness approach, values, herbal product range and massage services.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const { hero, whyChooseUs, productsServices, stats, values, cta } =
    aboutPageContent;

  return (
   <ApplicationShell>
  <div className={`${shared.page} ${styles.flow}`}>
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
        />

        <AboutHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          
          paragraphs={hero.paragraphs}
        />

        <WhyChooseUs
          title={whyChooseUs.title}
          intro={whyChooseUs.intro}
          items={whyChooseUs.items}
        />

        <ProductsServices
          title={productsServices.title}
          panels={productsServices.panels}
        />

        <StatsBar stats={stats} />

        <OurValues title={values.title} values={values.values} />

        <CTABanner
  title={cta.title}
  description={cta.description}
  primaryLabel={cta.primaryLabel}
  primaryHref="/products"
  secondaryLabel={cta.secondaryLabel}
  secondaryHref="/services"
/>
      </div>
    </ApplicationShell>
  );
}
