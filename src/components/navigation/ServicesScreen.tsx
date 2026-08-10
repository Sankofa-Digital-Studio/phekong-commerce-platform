"use client";

import Link from "next/link";
import { useState } from "react";
import { CommerceRouteHero } from "./CommerceRouteHero";
import { CommerceSectionHeading } from "./CommerceSectionHeading";
import "./services-screen.css";

type ServiceId = "product-guidance" | "ritual-planning" | "recovery-support";

interface ServiceDefinition {
  id: ServiceId;
  label: string;
  title: string;
  description: string;
  outcome: string;
  steps: ReadonlyArray<string>;
  contactTopic: string;
}

const services = [
  { id: "product-guidance", label: "Product guidance", title: "Choose from the approved collection", description: "For shoppers comparing products or deciding which category is the most sensible place to start.", outcome: "Leave with a smaller, clearer set of product options to explore.", steps: ["Share the care need", "Review suitable categories", "Continue to product details"], contactTopic: "product-guidance" },
  { id: "ritual-planning", label: "Ritual planning", title: "Build a routine that stays manageable", description: "For shoppers who want help turning one or two products into a repeatable body or hair-care sequence.", outcome: "Leave with a simple order of use and a realistic rhythm.", steps: ["Choose the intended ritual", "Keep the steps focused", "Confirm general-use boundaries"], contactTopic: "ritual-planning" },
  { id: "recovery-support", label: "Massage & recovery", title: "Ask about hands-on support", description: "For visitors exploring massage or recovery support who need human confirmation before assuming availability.", outcome: "Leave with the right questions and a clear contact path—not a false booking promise.", steps: ["Describe the support needed", "Confirm current availability", "Agree on the next step"], contactTopic: "recovery-support" },
] as const satisfies ReadonlyArray<ServiceDefinition>;

export interface ServicesScreenProps {
  initialService?: ServiceId;
}

export function ServicesScreen({ initialService = "product-guidance" }: ServicesScreenProps) {
  const [selectedId, setSelectedId] = useState<ServiceId>(initialService);
  const selectedService = services.find((service) => service.id === selectedId) ?? services[0];

  return (
    <div className="commerce-screen services-screen">
      <CommerceRouteHero
        pageLabel="Services"
        eyebrow="Guidance when you need it"
        title="A clearer next step, shaped around you."
        description="Not every wellness decision should begin with another product card. Choose the kind of support you need and see what a useful conversation can cover before you contact us."
        primaryAction={{ href: "#service-finder", label: "Find the right support" }}
        secondaryAction={{ href: "/contact", label: "Contact Phekong" }}
        proofPoints={["No false booking claims", "Clear service boundaries", "Human follow-up path"]}
        visualKicker="Guided support"
        visualTitle="Listen. Clarify. Continue."
        visualSteps={["Choose a support lane", "Understand the outcome", "Contact with context"]}
        tone="earth"
      />

      <section className="commerce-screen__section service-finder" id="service-finder" aria-labelledby="service-finder-title">
        <CommerceSectionHeading
          eyebrow="Choose a support lane"
          title="What would make the next decision easier?"
          description="Select one option. The complete service explanation stays on the page, including what happens next and what still needs human confirmation."
          id="service-finder-title"
        />
        <div className="service-finder__layout">
          <fieldset className="service-picker">
            <legend className="visually-hidden">Choose a service</legend>
            {services.map((service, index) => (
              <button key={service.id} type="button" aria-pressed={selectedId === service.id} onClick={() => setSelectedId(service.id)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service.label}</strong>
                <small>{service.description}</small>
              </button>
            ))}
          </fieldset>

          <article className="service-detail" aria-live="polite">
            <p className="commerce-kicker">Selected support</p>
            <h2>{selectedService.title}</h2>
            <p className="service-detail__description">{selectedService.description}</p>
            <ol>
              {selectedService.steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
            </ol>
            <div className="service-detail__outcome"><strong>Useful outcome</strong><p>{selectedService.outcome}</p></div>
            <Link className="commerce-action commerce-action--primary" href={`/contact?topic=${selectedService.contactTopic}`}>Continue to contact</Link>
          </article>
        </div>
      </section>

      <aside className="commerce-screen__closing service-boundary" aria-labelledby="service-boundary-title">
        <p className="service-boundary__mark" aria-hidden="true">i</p>
        <div><p className="commerce-kicker">An honest boundary</p><h2 id="service-boundary-title">Guidance first. Confirmation before commitment.</h2><p>Service availability and any appointment details must be confirmed directly with Phekong. The website does not present a preview as a completed booking.</p></div>
      </aside>
    </div>
  );
}
