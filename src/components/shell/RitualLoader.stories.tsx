import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RitualLoader } from "./RitualLoader";

const meta = {
  title: "M1/Shell/RitualLoader",
  component: RitualLoader,
  parameters: { layout: "fullscreen" },
  args: {
    title: "Rooting your wellness journey",
    message: "Growing a calm space for your arrival.",
    label: "Preparing the Phekong experience",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RitualLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstArrival: Story = {};

export const ProductApiCall: Story = {
  args: {
    title: "Preparing your product ritual",
    message: "We’re gathering the latest product details and availability.",
    label: "Loading product details",
  },
};