import type { Metadata } from "next";
import { AboutScreen } from "@/components/navigation/AboutScreen";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Phekong",
  description: "Discover Phekong Wellness Centre's Welkom roots and considered approach to everyday wellness care.",
  alternates: { canonical: buildCanonicalUrl("/about") },
};

export default function AboutPage() {
  return (
    <ApplicationShell activeRoute="about" showStatePanel={false}>
      <AboutScreen />
    </ApplicationShell>
  );
}
