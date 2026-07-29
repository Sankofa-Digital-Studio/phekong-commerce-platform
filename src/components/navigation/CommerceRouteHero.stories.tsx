import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommerceRouteHero } from "./CommerceRouteHero";

const meta = {
  title: "M2/Navigation/CommerceRouteHero",
  component: CommerceRouteHero,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    pageLabel: "Example",
    eyebrow: "Reusable route introduction",
    title: "A clear promise before the first decision.",
    description: "Use this hero to explain the route's customer job, provide two useful actions, and surface trust signals without relying on photography.",
    primaryAction: { href: "#content", label: "Start here" },
    secondaryAction: { href: "/products", label: "Browse products" },
    proofPoints: ["Token driven", "Responsive", "Clear actions"],
    visualKicker: "The route rhythm",
    visualTitle: "Orient. Explain. Act.",
    visualSteps: ["State the promise", "Reduce uncertainty", "Offer the next step"],
    tone: "earth",
  },
} satisfies Meta<typeof CommerceRouteHero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Earth: Story = {};
export const Botanical: Story = { args: { tone: "botanical" } };
export const Gold: Story = { args: { tone: "gold" } };
