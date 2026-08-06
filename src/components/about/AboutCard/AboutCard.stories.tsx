import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AboutCard } from "./AboutCard";

const meta = {
  title: "M1/Components/About/AboutCard",
  component: AboutCard,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <h3>Card Title</h3>
        <p>This is the card content. You can put any React elements here.</p>
      </>
    ),
    variant: "elevated",
    padding: "md",
  },
} satisfies Meta<typeof AboutCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <>
        <h3>Elevated Card</h3>
        <p>This card lifts up when you hover over it.</p>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <>
        <h3>Outlined Card</h3>
        <p>This card has a 2px border and transparent background.</p>
      </>
    ),
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: (
      <>
        <h3>Ghost Card</h3>
        <p>No border, no background - just the content.</p>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: "none",
    children: (
      <>
        <h3>No Padding</h3>
        <p>Content is flush with the card edges.</p>
      </>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "sm",
    children: (
      <>
        <h3>Small Padding</h3>
        <p>Compact spacing inside the card (0.75rem).</p>
      </>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: "lg",
    children: (
      <>
        <h3>Large Padding</h3>
        <p>Generous spacing inside the card (2rem).</p>
      </>
    ),
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert("Card clicked!"),
    children: (
      <>
        <h3>Clickable Card</h3>
        <p>Click me! The cursor changes to pointer.</p>
      </>
    ),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
