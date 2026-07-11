import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { CommercePreview } from "@/components/commerce/CommercePreview";

export const metadata: Metadata = {
  title: "Commerce Preview",
  description: "Visual cart, payment, favorites, and profile preview for the public Phekong shell.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CommercePreviewPage() {
  return (
    <ApplicationShell activeRoute="cart" showStatePanel={false}>
      <CommercePreview />
    </ApplicationShell>
  );
}
