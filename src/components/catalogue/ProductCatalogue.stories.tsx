import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductCatalogue } from "./ProductCatalogue";

const meta = {
  title: "M1/Catalogue/ProductCatalogue",
  component: ProductCatalogue,
  tags: ["autodocs"],
} satisfies Meta<typeof ProductCatalogue>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ready: Story = {};

export const Loading: Story = {
  args: {
    state: "loading",
  },
};

export const Empty: Story = {
  args: {
    state: "empty",
    onRetry: () => undefined,
  },
};

export const Error: Story = {
  args: {
    state: "error",
    onRetry: () => undefined,
  },
};
