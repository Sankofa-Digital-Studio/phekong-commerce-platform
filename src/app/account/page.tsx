import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { PublicRouteSurface } from "@/components/routes/PublicRouteSurface";

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
      <PublicRouteSurface
        eyebrow="Customer account"
        title="Account route placeholder"
        description="Customer authentication is not wired in this public milestone. The route exists so the shell action resolves cleanly."
        summary="This route is intentionally noindex and stays blocked until a supported auth flow ships."
        actions={[
          {
            kind: "button",
            label: "Sign in preview",
            variant: "primary",
            blocked: true,
            blockedMessage: "Account access is blocked until authentication is implemented."
          },
          { kind: "link", label: "Browse products", href: "/products", variant: "secondary" },
          { kind: "link", label: "Contact support", href: "/contact", variant: "ghost" },
        ]}
      />
    </ApplicationShell>
  );
}
