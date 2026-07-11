import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { Card } from "@/components/ui/Card";
import { PublicRouteSurface } from "@/components/routes/PublicRouteSurface";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rituals",
  description: "Public ritual planning route for the Phekong Wellness Centre shell.",
  alternates: {
    canonical: buildCanonicalUrl("/rituals"),
  },
};

export default function RitualsPage() {
  return (
    <ApplicationShell activeRoute="rituals" showStatePanel={false}>
      <PublicRouteSurface
        eyebrow="Rituals"
        title="Build a consistent daily ritual"
        description="Ritual planning turns the product catalogue into a repeatable sequence of care. The route is live, readable, and ready for the next milestone."
        summary="Choose a ritual, preview the steps, and move back into products without dead-end navigation."
        note="This route keeps the public shell honest while leaving checkout and customer profile flows out of scope."
        actions={[
          {
            kind: "link",
            label: "Browse products",
            href: "/products",
            variant: "primary",
          },
          {
            kind: "button",
            label: "Preview ritual steps",
            variant: "secondary",
            loadingLabel: "Preparing ritual preview...",
            successMessage: "Ritual preview loaded.",
          },
          {
            kind: "button",
            label: "Request unavailable item",
            variant: "ghost",
            blocked: true,
            blockedMessage: "That request is blocked until custom ritual support is available.",
          },
        ]}
      >
        <Card eyebrow="Ritual sequence" title="Three-step public ritual" tone="surface">
          <p>1. Cleanse with a body or hair product that matches the current need.</p>
          <p>2. Nourish with a richer treatment that restores balance.</p>
          <p>3. Seal with a finishing product and return to the catalogue when needed.</p>
        </Card>
      </PublicRouteSurface>
    </ApplicationShell>
  );
}
