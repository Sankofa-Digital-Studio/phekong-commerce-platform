import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Account",
  description: "Customer account route placeholder for the public Phekong shell.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  return (
    <ApplicationShell activeRoute="account" showStatePanel={false}>
      <Card eyebrow="Customer account" title="Account route placeholder" tone="accent">
        <p>
          Customer authentication is not wired in this public milestone. The route exists so the shell action resolves cleanly.
        </p>
      </Card>
    </ApplicationShell>
  );
}
