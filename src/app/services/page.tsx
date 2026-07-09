import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { Card } from "@/components/ui/Card";
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
      <Card eyebrow="Services" title="Service route placeholder" tone="accent">
        <p>
          The shell exposes a public services route so the navigation lands on a real page while service content remains out of scope for this milestone.
        </p>
      </Card>
    </ApplicationShell>
  );
}
