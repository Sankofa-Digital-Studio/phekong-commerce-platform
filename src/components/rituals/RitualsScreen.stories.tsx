import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { RitualsScreen } from "./RitualsScreen";

const meta = { title: "M2/Rituals/RitualsScreen", component: RitualsScreen, parameters: { layout: "fullscreen" }, tags: ["autodocs"] } satisfies Meta<typeof RitualsScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const DailySoftness: Story = {};
export const HairNourishment: Story = { args: { initialRitual: "hair-nourishment" } };
export const WeeklyRenewalInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Weekly renewal" }));
    await expect(canvas.getByRole("heading", { name: /polish, replenish, and pause/i })).toBeInTheDocument();
    await expect(canvas.getByText("Out of stock")).toBeInTheDocument();
  },
};
