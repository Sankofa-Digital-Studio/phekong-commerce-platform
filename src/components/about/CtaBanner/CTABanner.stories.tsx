import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CTABanner } from './CTABanner';

const meta = {
  title: 'M1/Components/About/CTABanner',
  component: CTABanner,
  tags: ['autodocs'],
 args: {
  title: "Begin Your Wellness Journey Today",
  description:
    "Experience the healing power of nature and professional care, all in one place.",
  primaryLabel: "Shop Now",
  primaryHref: "/products",
  secondaryLabel: "Book Massage",
  secondaryHref: "/services",
},
} satisfies Meta<typeof CTABanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
