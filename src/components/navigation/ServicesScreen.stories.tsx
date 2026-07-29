import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ServicesScreen } from "./ServicesScreen";

const meta = { title: "M2/Navigation/ServicesScreen", component: ServicesScreen, parameters: { layout: "fullscreen" }, tags: ["autodocs"] } satisfies Meta<typeof ServicesScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ProductGuidance: Story = {};
export const RitualPlanning: Story = { args: { initialService: "ritual-planning" } };
export const RecoveryInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /massage & recovery/i }));
    await expect(canvas.getByRole("heading", { name: /ask about hands-on support/i })).toBeInTheDocument();
  },
};
