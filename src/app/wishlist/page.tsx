import type { Metadata } from "next";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { CommerceScreen } from "@/components/commerce/CommerceScreen";

export const metadata: Metadata = {
  title: "Wishlist Preview",
  description: "Favorites and wishlist preview for the public Phekong shell.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistPage() {
  return (
    <ApplicationShell activeRoute="products" showStatePanel={false}>
      <CommerceScreen kind="wishlist" />
    </ApplicationShell>
  );
}
