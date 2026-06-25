import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeatureCard } from "./FeatureCard";

const meta = {
  title: "M1/Components/FeatureCard",
  component: FeatureCard,
  tags: ["autodocs"],
  args: {
    title: "Responsive storefront",
    badge: "Phase 1",
    description: "A flexible landing experience for product discovery and service booking."
  }
} satisfies Meta<typeof FeatureCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
