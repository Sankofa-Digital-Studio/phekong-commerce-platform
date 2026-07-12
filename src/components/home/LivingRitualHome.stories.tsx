import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { LivingRitualHome } from "./LivingRitualHome";

const meta = {
  title: "M1/Home/Living Ritual",
  component: LivingRitualHome,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LivingRitualHome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Mobile320: Story = { parameters: { viewport: { defaultViewport: "mobile1" } } };
export const Desktop1440: Story = { parameters: { viewport: { defaultViewport: "desktop" } } };
export const RestoringRitual: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "I need to feel restored" }));
    await expect(canvas.getByRole("button", { name: /build my restoring ritual/i })).toBeEnabled();
    await expect(canvas.getByRole("heading", { name: /restore your rhythm/i })).toBeInTheDocument();
  },
};
export const GroundingRitual: Story = { play: async ({ canvasElement }) => userEvent.click(within(canvasElement).getByRole("button", { name: "I want to slow down" })) };
export const CareRitual: Story = { play: async ({ canvasElement }) => userEvent.click(within(canvasElement).getByRole("button", { name: "I want to feel cared for" })) };
export const RenewalRitual: Story = { play: async ({ canvasElement }) => userEvent.click(within(canvasElement).getByRole("button", { name: "I want a fresh beginning" })) };
