import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ApplicationShell } from "./ApplicationShell";

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
