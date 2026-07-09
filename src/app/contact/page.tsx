import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { Card } from "@/components/ui/Card";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Public contact route for the Phekong Wellness Centre shell.",
  alternates: {
    canonical: buildCanonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <ApplicationShell activeRoute="contact" showStatePanel={false}>
      <Card eyebrow="Contact" title="Contact route placeholder" tone="accent">
        <p>
          The public shell keeps the contact route live. Final contact details and submission flows are still being confirmed.
        </p>
        <p>Return to the catalogue to continue browsing approved products.</p>
      </Card>
    </ApplicationShell>
  );
}
