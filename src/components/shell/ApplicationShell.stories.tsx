import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ApplicationShell } from "./ApplicationShell";
import { expect, userEvent, within } from "storybook/test";

const meta = {
  title: "M1/Shell/ApplicationShell",
  component: ApplicationShell,
  parameters: { layout: "fullscreen" },
  args: {
    showStatePanel: false,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ApplicationShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullPage: Story = {};

export const LoadingCatalogue: Story = {
  args: {
    catalogueState: "loading",
  },
};

export const EmptyCatalogue: Story = {
  args: {
    catalogueState: "empty",
    catalogueOnRetry: () => undefined,
  },
};

export const ErrorCatalogue: Story = {
  args: {
    catalogueState: "error",
    catalogueOnRetry: () => undefined,
  },
};


export const AdaptiveInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Enter now" }));
    await expect(canvas.getByRole("link", { name: "Begin your ritual" })).toHaveAttribute("href", "/#shop-by-need");
    await userEvent.click(canvas.getByRole("button", { name: "Use less data" }));
    await expect(canvas.getByRole("button", { name: "Use enhanced visuals" })).toHaveAttribute("aria-pressed", "true");
  },
};
