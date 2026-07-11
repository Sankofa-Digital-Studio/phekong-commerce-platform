import type { Metadata } from "next";
import { ApplicationShell } from "../components/shell/ApplicationShell";
import { HomeExperience } from "@/components/home/HomeExperience";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Public product catalogue",
  description: "Phekong Wellness Centre's public catalogue of approved products and product detail pages.",
  alternates: {
    canonical: buildCanonicalUrl("/"),
  },
};

export default function HomePage() {
  return (
    <ApplicationShell activeRoute="home" showStatePanel={false}>
      <HomeExperience />
    </ApplicationShell>
  );
}
