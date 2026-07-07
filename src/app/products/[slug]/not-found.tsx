import Link from "next/link";
import { ApplicationShell } from "@/components/shell/ApplicationShell";
import { Card } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <ApplicationShell activeRoute="products" showStatePanel={false}>
      <Card eyebrow="Product not found" title="No approved product matches this slug" tone="accent">
        <p>
          The product route only accepts approved slugs from the read-only catalogue. Return to the
          homepage catalogue to choose a valid product.
        </p>
        <p>
          <Link href="/#products">Back to catalogue</Link>
        </p>
      </Card>
    </ApplicationShell>
  );
}

