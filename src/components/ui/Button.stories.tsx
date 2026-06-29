import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/Button";

const meta = {
  title: "M1/Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Contact Phekong" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost"] }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
