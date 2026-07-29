import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { CommerceScreen } from "@/components/commerce/CommerceScreen";

export const metadata: Metadata = {
  title: "Cart and Checkout Preview",
  description: "Visual cart, payment, favorites, and profile preview for the public Phekong shell.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <ApplicationShell activeRoute="cart" showStatePanel={false}>
      <CommerceScreen kind="cart" />
    </ApplicationShell>
  );
}
