import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { PublicRouteSurface } from "@/components/routes/PublicRouteSurface";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Public overview of the Phekong Wellness Centre M1 shell.",
  alternates: {
    canonical: buildCanonicalUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <ApplicationShell activeRoute="about" showStatePanel={false}>
      <PublicRouteSurface
        eyebrow="About Phekong"
        title="Public brand overview"
        description="Phekong's public M1 shell is a read-only commerce foundation for approved products and future service routes."
        summary="No checkout, customer account, or inventory write flows are exposed here."
        actions={[
          { kind: "link", label: "Browse products", href: "/products", variant: "primary" },
          { kind: "link", label: "Explore rituals", href: "/rituals", variant: "secondary" },
          {
            kind: "button",
            label: "Preview contact route",
            variant: "ghost",
            loadingLabel: "Preparing contact route preview...",
            successMessage: "Contact route preview is ready.",
          },
        ]}
      />
    </ApplicationShell>
  );
}
