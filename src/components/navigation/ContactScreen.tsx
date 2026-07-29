"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { CommerceRouteHero } from "./CommerceRouteHero";
import { CommerceSectionHeading } from "./CommerceSectionHeading";
import "./contact-screen.css";

export type ContactTopic = "general" | "product" | "ritual" | "service" | "order";

interface ContactTopicDefinition {
  id: ContactTopic;
  label: string;
  description: string;
}

interface EnquiryReview {
  name: string;
  email: string;
  topic: ContactTopic;
  reference: string;
  message: string;
}

const topics = [
  { id: "general", label: "General enquiry", description: "A question that does not fit another lane." },
  { id: "product", label: "Product guidance", description: "Ingredients, availability, comparison, or product-page context." },
  { id: "ritual", label: "Ritual support", description: "Help turning approved products into a manageable sequence." },
  { id: "service", label: "Service enquiry", description: "Product guidance, ritual planning, massage, or recovery support." },
  { id: "order", label: "Order support", description: "A future-facing lane for an order reference or shopping concern." },
] as const satisfies ReadonlyArray<ContactTopicDefinition>;

export function normalizeContactTopic(value?: string): ContactTopic {
  if (value === "product-guidance" || value === "product") return "product";
  if (value === "ritual-planning" || value === "ritual") return "ritual";
  if (value === "recovery-support" || value === "service") return "service";
  if (value === "order") return "order";
  return "general";
}

export interface ContactScreenProps {
  initialTopic?: ContactTopic;
}

export function ContactScreen({ initialTopic = "general" }: ContactScreenProps) {
  const [selectedTopic, setSelectedTopic] = useState<ContactTopic>(initialTopic);
  const [review, setReview] = useState<EnquiryReview | null>(null);
  const [status, setStatus] = useState("Choose a topic and add enough context for a useful reply.");

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextReview = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      topic: selectedTopic,
      reference: String(data.get("reference") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    if (!nextReview.name || !nextReview.email || !nextReview.message) {
      setReview(null);
      setStatus("Complete your name, email, and message before reviewing the enquiry.");
      return;
    }

    setReview(nextReview);
    setStatus("Your enquiry is ready to review. It has not been sent.");
  }

  async function copyEnquiry() {
    if (!review) return;
    const topicLabel = topics.find((topic) => topic.id === review.topic)?.label ?? "General enquiry";
    const summary = [
      `Phekong enquiry: ${topicLabel}`,
      `Name: ${review.name}`,
      `Email: ${review.email}`,
      review.reference ? `Reference: ${review.reference}` : "",
      `Message: ${review.message}`,
    ].filter(Boolean).join("\n");

    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Enquiry summary copied. It is still not sent.");
    } catch {
      setStatus("Copying is unavailable in this browser. Your review remains visible below.");
    }
  }

  const selectedTopicLabel = topics.find((topic) => topic.id === selectedTopic)?.label ?? "General enquiry";

  return (
    <div className="commerce-screen contact-screen">
      <CommerceRouteHero
        pageLabel="Contact"
        eyebrow="Start with the right context"
        title="Make the first message more useful."
        description="Choose what you need help with, add the details that matter, and review a clean enquiry summary. The public sending channel is still being confirmed, so this page never pretends an unsent message was delivered."
        primaryAction={{ href: "#enquiry-planner", label: "Prepare an enquiry" }}
        secondaryAction={{ href: "/services", label: "Review guided services" }}
        proofPoints={["No false send confirmation", "Clear enquiry routing", "Sensitive details discouraged"]}
        visualKicker="A better first message"
        visualTitle="Choose. Explain. Review."
        visualSteps={["Select the topic", "Add useful context", "Review before sharing"]}
        tone="botanical"
      />

      <section className="commerce-screen__section enquiry-planner" id="enquiry-planner" aria-labelledby="enquiry-planner-title">
        <CommerceSectionHeading
          eyebrow="Enquiry planner"
          title="Route the question before writing it."
          description="This planner creates a clear summary for review. It does not submit data to a server or claim that Phekong has received it."
          id="enquiry-planner-title"
        />

        <form className="enquiry-form" onSubmit={prepareEnquiry} noValidate>
          <fieldset className="enquiry-topics">
            <legend>What can we help with?</legend>
            <div className="enquiry-topics__grid">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  aria-pressed={selectedTopic === topic.id}
                  onClick={() => {
                    setSelectedTopic(topic.id);
                    setReview(null);
                    setStatus(`${topic.label} selected. Add your contact details and message.`);
                  }}
                >
                  <strong>{topic.label}</strong>
                  <span>{topic.description}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="enquiry-form__fields">
            <label>
              <span>Your name</span>
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              <span>Email for a future reply</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="enquiry-form__wide">
              <span>Product, service, or order reference <small>Optional</small></span>
              <input name="reference" />
            </label>
            <label className="enquiry-form__wide">
              <span>How can Phekong help?</span>
              <textarea name="message" rows={6} required />
            </label>
          </div>

          <div className="enquiry-form__footer">
            <p>Do not include passwords, payment-card numbers, identity documents, or private medical records.</p>
            <button className="commerce-action commerce-action--primary" type="submit">Review enquiry</button>
          </div>
        </form>

        <p className="enquiry-status" role="status">{status}</p>

        <article className={`enquiry-review ${review ? "enquiry-review--ready" : ""}`} aria-labelledby="enquiry-review-title">
          <div className="enquiry-review__heading">
            <div><p className="commerce-kicker">Review, not delivery</p><h2 id="enquiry-review-title">{review ? "Ready to share when a channel is confirmed." : "Your enquiry summary will appear here."}</h2></div>
            <span>{review ? topics.find((topic) => topic.id === review.topic)?.label : selectedTopicLabel}</span>
          </div>
          {review ? (
            <dl className="enquiry-review__details">
              <div><dt>Name</dt><dd>{review.name}</dd></div>
              <div><dt>Email</dt><dd>{review.email}</dd></div>
              {review.reference ? <div><dt>Reference</dt><dd>{review.reference}</dd></div> : null}
              <div className="enquiry-review__message"><dt>Message</dt><dd>{review.message}</dd></div>
            </dl>
          ) : <p className="enquiry-review__empty">Complete the required fields and choose “Review enquiry.” Nothing leaves this browser.</p>}
          <div className="enquiry-review__footer">
            <p>Copying prepares the text for another approved channel; it does not send the enquiry.</p>
            <button type="button" disabled={!review} onClick={copyEnquiry}>Copy enquiry summary</button>
          </div>
        </article>
      </section>

      <section className="commerce-screen__section contact-paths" aria-labelledby="contact-paths-title">
        <CommerceSectionHeading
          eyebrow="Before you write"
          title="The fastest path may already be on the site."
          description="These routes answer common discovery questions immediately and give a future enquiry more useful context."
          id="contact-paths-title"
        />
        <div className="contact-paths__grid">
          <Link href="/products"><span>Products</span><h3>Compare approved essentials</h3><p>Check current prices, availability, and product details before asking a product question.</p></Link>
          <Link href="/rituals"><span>Rituals</span><h3>Start with a manageable sequence</h3><p>Use the guided ritual screen when the real question is where to begin.</p></Link>
          <Link href="/services"><span>Services</span><h3>Understand the support lanes</h3><p>See what product guidance, ritual planning, and recovery enquiries can cover.</p></Link>
        </div>
      </section>
    </div>
  );
}
