import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { PublicRouteSurface } from "@/components/routes/PublicRouteSurface";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart route placeholder for the public Phekong shell.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <ApplicationShell activeRoute="cart" showStatePanel={false}>
      <PublicRouteSurface
        eyebrow="Cart"
        title="Cart route placeholder"
        description="No shopping cart or checkout workflow is exposed yet. The icon now lands on a real route instead of a dead action."
        summary="The route is public, but checkout stays blocked until order handling exists."
        actions={[
          {
            kind: "button",
            label: "Attempt checkout",
            variant: "primary",
            blocked: true,
            blockedMessage: "Checkout is blocked until a supported checkout flow is available."
          },
          { kind: "link", label: "Continue shopping", href: "/products", variant: "secondary" },
          { kind: "link", label: "Explore rituals", href: "/rituals", variant: "ghost" },
        ]}
      />
    </ApplicationShell>
  );
}
