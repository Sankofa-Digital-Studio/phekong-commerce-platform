import type { Metadata } from "next";
import { ApplicationShell } from "../components/shell/ApplicationShell";
import { LivingRitualHome } from "@/components/home/LivingRitualHome";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Phekong Wellness Centre | Find Your Ritual",
  description: "Tell us how you want to feel and discover a simple Phekong wellness ritual, rooted in Welkom, South Africa.",
  alternates: {
    canonical: buildCanonicalUrl("/"),
  },
};

export default function HomePage() {
  return (
    <ApplicationShell activeRoute="home" showStatePanel={false}>
      <LivingRitualHome />
    </ApplicationShell>
  );
}
