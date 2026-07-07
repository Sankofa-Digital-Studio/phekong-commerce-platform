import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProductDetail } from "./ProductDetail";
import { catalogueProducts } from "@/lib/products/fixture-repository";

const meta = {
  title: "M1/Products/ProductDetail",
  component: ProductDetail,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FixtureFallback: Story = {
  args: {
    product: catalogueProducts[0],
    source: "fixture",
    fallbackReason: "live-unavailable",
  },
};

export const LiveProduct: Story = {
  args: {
    product: catalogueProducts[1],
    source: "live",
  },
};

