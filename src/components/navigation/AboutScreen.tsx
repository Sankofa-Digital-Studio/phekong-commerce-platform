import Link from "next/link";
import { CommerceRouteHero } from "./CommerceRouteHero";
import { CommerceSectionHeading } from "./CommerceSectionHeading";
import "./about-screen.css";

export function AboutScreen() {
  return (
    <div className="commerce-screen about-screen">
      <CommerceRouteHero
        pageLabel="About"
        eyebrow="Our story"
        title="Rooted in Welkom. Made for everyday care."
        description="Phekong Wellness Centre began in 2006 in Welkom, Free State. Today, that origin guides a calmer commerce experience shaped around natural wellness, clear choices, and respect for the person making them."
        primaryAction={{ href: "#our-foundation", label: "Read our foundation" }}
        secondaryAction={{ href: "/products", label: "Explore products" }}
        proofPoints={["Established in 2006", "Welkom, Free State", "Care without overclaiming"]}
        visualKicker="The foundation"
        visualTitle="Place. Practice. Progress."
        visualSteps={["Begin with community", "Curate with intention", "Grow with clarity"]}
        tone="botanical"
      />

      <section className="commerce-screen__section about-foundation" id="our-foundation" aria-labelledby="about-foundation-title">
        <CommerceSectionHeading
          eyebrow="Where we began"
          title="A local beginning with room to grow."
          description="The brand story is not decoration. It gives shoppers a clear reason to trust the care, restraint, and South African point of view behind the storefront."
          id="about-foundation-title"
        />
        <div className="about-foundation__layout">
          <article className="about-origin-card">
            <p className="about-origin-card__year">2006</p>
            <h3>Phekong Wellness Centre is established in Welkom.</h3>
            <p>The original point of view remains simple: make natural-wellness choices feel more understandable, considered, and connected to everyday life.</p>
          </article>
          <ol className="about-storyline">
            <li><span>01</span><div><h3>Start with the person</h3><p>Discovery begins with a need or ritual, not with an overwhelming wall of inventory.</p></div></li>
            <li><span>02</span><div><h3>Present products honestly</h3><p>Availability, price, and general-use boundaries stay visible before a shopper moves deeper.</p></div></li>
            <li><span>03</span><div><h3>Make support reachable</h3><p>When a decision needs a human conversation, the journey leads clearly to services or contact.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="commerce-screen__section about-principles" aria-labelledby="about-principles-title">
        <CommerceSectionHeading
          eyebrow="How care shows up"
          title="Three principles you can see in the interface."
          description="A production brand earns trust through repeated behaviour. These principles connect the story to what shoppers can actually experience."
          id="about-principles-title"
        />
        <div className="about-principles__grid">
          <article><p>Clarity</p><h3>Fewer, stronger choices</h3><span>Complete cards, clear labels, and direct next steps reduce avoidable uncertainty.</span></article>
          <article><p>Restraint</p><h3>No medical theatre</h3><span>General wellness framing stays separate from professional health advice and unsupported promises.</span></article>
          <article><p>Continuity</p><h3>One visual language</h3><span>Products, rituals, services, and support share the same tokens, spacing, and interaction rules.</span></article>
        </div>
      </section>

      <aside className="commerce-screen__closing about-closing" aria-labelledby="about-closing-title">
        <div><p className="commerce-kicker">Continue the story</p><h2 id="about-closing-title">See how the foundation becomes a daily ritual.</h2></div>
        <div className="about-closing__actions"><Link className="commerce-action commerce-action--primary" href="/rituals">Explore rituals</Link><Link className="commerce-action commerce-action--secondary" href="/contact">Talk to Phekong</Link></div>
      </aside>
    </div>
  );
}
