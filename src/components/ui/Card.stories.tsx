import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const meta = {
  title: "M1/Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    eyebrow: "Wellness service",
    title: "A calmer customer journey",
    children: (
      <p>
        Approved tokens keep this component aligned with the public Phekong experience.
      </p>
    )
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["surface", "accent"] }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = {};

export const Accent: Story = {
  args: { tone: "accent" }
};

export const WithAction: Story = {
  args: {
    footer: <Button size="small">Explore service</Button>
  }
};
