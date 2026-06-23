import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ApplicationShell } from "./ApplicationShell";

const meta = {
  title: "M1/Shell/ApplicationShell",
  component: ApplicationShell,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    locale: { control: "inline-radio", options: ["en", "zh"] },
    state: { control: "inline-radio", options: ["ready", "loading", "empty", "error"] },
    activeRoute: { control: "select", options: ["home", "about", "products", "services", "contact"] }
  }
} satisfies Meta<typeof ApplicationShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = { args: { state: "ready", locale: "en", activeRoute: "home" } };
export const Loading: Story = { args: { state: "loading", locale: "en" } };
export const Empty: Story = { args: { state: "empty", locale: "en" } };
export const Error: Story = { args: { state: "error", locale: "en" } };
export const Chinese: Story = { args: { state: "ready", locale: "zh", activeRoute: "products" } };
