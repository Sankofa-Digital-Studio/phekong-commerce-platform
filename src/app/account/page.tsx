import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { CommerceScreen } from "@/components/commerce/CommerceScreen";

export const metadata: Metadata = {
  title: "Account Preview",
  description: "Optional customer profile preview for the public Phekong shell.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  return (
    <ApplicationShell activeRoute="account" showStatePanel={false}>
      <CommerceScreen kind="account" />
    </ApplicationShell>
  );
}
