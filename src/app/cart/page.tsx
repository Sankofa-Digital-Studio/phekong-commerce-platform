import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { Card } from "@/components/ui/Card";

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
      <Card eyebrow="Cart" title="Cart route placeholder" tone="accent">
        <p>
          No shopping cart or checkout workflow is exposed yet. The icon now lands on a real route instead of a dead action.
        </p>
      </Card>
    </ApplicationShell>
  );
}
