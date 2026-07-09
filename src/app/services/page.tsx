import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { PublicRouteSurface } from "@/components/routes/PublicRouteSurface";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Public services route placeholder for the Phekong Wellness Centre shell.",
  alternates: {
    canonical: buildCanonicalUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <ApplicationShell activeRoute="services" showStatePanel={false}>
      <PublicRouteSurface
        eyebrow="Services"
        title="Service route placeholder"
        description="The shell exposes a public services route so the navigation lands on a real page while service content remains out of scope for this milestone."
        summary="This page stays route-safe and gives the shell a real destination while the service catalog is still being defined."
        actions={[
          { kind: "link", label: "Browse rituals", href: "/rituals", variant: "primary" },
          { kind: "link", label: "View products", href: "/products", variant: "secondary" },
          {
            kind: "button",
            label: "Open service inquiry",
            variant: "ghost",
            loadingLabel: "Opening inquiry preview...",
            successMessage: "Service inquiry preview opened.",
          },
        ]}
      />
    </ApplicationShell>
  );
}
