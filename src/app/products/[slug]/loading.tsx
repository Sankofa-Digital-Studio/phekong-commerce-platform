import { RitualLoader } from "@/components/shell/RitualLoader";

export default function LoadingProductPage() {
  return (
    <RitualLoader
      title="Preparing your product ritual"
      message="We’re gathering the latest product details and availability."
      label="Loading product details"
    />
  );
}