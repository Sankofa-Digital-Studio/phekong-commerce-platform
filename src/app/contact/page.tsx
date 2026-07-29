import type { Metadata } from "next";
import { ContactScreen, normalizeContactTopic } from "@/components/navigation/ContactScreen";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { buildCanonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Prepare a clearly routed product, ritual, service, or order enquiry for Phekong Wellness Centre.",
  alternates: { canonical: buildCanonicalUrl("/contact") },
};

interface ContactPageProps {
  searchParams: Promise<{ topic?: string | string[] }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { topic } = await searchParams;
  const topicValue = Array.isArray(topic) ? topic[0] : topic;

  return (
    <ApplicationShell activeRoute="contact" showStatePanel={false}>
      <ContactScreen initialTopic={normalizeContactTopic(topicValue)} />
    </ApplicationShell>
  );
}
