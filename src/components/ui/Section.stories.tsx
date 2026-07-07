import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "./Section";

const meta = {
  title: "M1/Components/Section",
  component: Section,
  tags: ["autodocs"],
  args: {
    title: "Section headline",
    intro: "A small lead paragraph summarising the content in this section.",
    children: <p>This is a section body rendered in Storybook.</p>
  }
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoIntro: Story = { args: { intro: undefined } };
