import type { Metadata } from "next";
import { ServicesScreen } from "@/components/navigation/ServicesScreen";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore product guidance, ritual planning, and recovery-support contact paths from Phekong.",
  alternates: { canonical: buildCanonicalUrl("/services") },
};

export default function ServicesPage() {
  return (
    <ApplicationShell activeRoute="services" showStatePanel={false}>
      <ServicesScreen />
    </ApplicationShell>
  );
}
