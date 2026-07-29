import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ProductsScreen } from "./ProductsScreen";

const meta = { title: "M2/Navigation/ProductsScreen", component: ProductsScreen, parameters: { layout: "fullscreen" }, tags: ["autodocs"] } satisfies Meta<typeof ProductsScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteCollection: Story = {};
export const HairCare: Story = { args: { initialFilter: "hair" } };
export const FilterInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Cleansing" }));
    await expect(canvas.getByText("Showing 1 product")).toBeInTheDocument();
  },
};
