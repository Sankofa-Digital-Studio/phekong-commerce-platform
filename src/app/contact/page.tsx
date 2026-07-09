import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { PublicRouteSurface } from "@/components/routes/PublicRouteSurface";
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
      <PublicRouteSurface
        eyebrow="Contact"
        title="Contact route placeholder"
        description="The public shell keeps the contact route live. Final contact details and submission flows are still being confirmed."
        summary="Return to the catalogue to continue browsing approved products."
        actions={[
          {
            kind: "button",
            label: "Send enquiry preview",
            variant: "primary",
            loadingLabel: "Sending enquiry preview...",
            successMessage: "Enquiry preview captured successfully.",
          },
          { kind: "link", label: "Browse products", href: "/products", variant: "secondary" },
          { kind: "link", label: "Explore rituals", href: "/rituals", variant: "ghost" },
        ]}
      />
    </ApplicationShell>
  );
}
