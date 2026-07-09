import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { Card } from "@/components/ui/Card";
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
      <Card eyebrow="About Phekong" title="Public brand overview" tone="accent">
        <p>
          Phekong's public M1 shell is a read-only commerce foundation for approved products and future service routes.
        </p>
        <p>No checkout, customer account, or inventory write flows are exposed here.</p>
      </Card>
    </ApplicationShell>
  );
}
