import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { RitualsScreen } from "@/components/rituals/RitualsScreen";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rituals",
  description: "Build a clear Phekong body or hair ritual from a small set of approved wellness products.",
  alternates: {
    canonical: buildCanonicalUrl("/rituals"),
  },
};

export default function RitualsPage() {
  return (
    <ApplicationShell activeRoute="rituals" showStatePanel={false}>
      <RitualsScreen />
    </ApplicationShell>
  );
}
