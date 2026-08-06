import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OurValues } from './OurValues';

const meta = {
  title: 'M1/Components/About/OurValues',
  component: OurValues,
  tags: ['autodocs'],
  args: {
    title: 'Our Values',
    values: [
      {
        image: {
  src: "/images/quality.png",
  alt: "Quality icon",
},
        title: 'Quality',
        description: '"We source and provide only the best quality herbs and products.',
      },
      {
     image: {
  src: "/images/integrity.png",
  alt: "Integrity icon",
},
        title: 'Integrity',
        description: 'Honest, transparent and ethical in all we do.',
      },
      {
       image: {
  src: "/images/community.png",
  alt: "Community icon",
},
        title: 'Community',
        description: 'We care about our community and empower healthier lives together.',
      },
    ],
  },
} satisfies Meta<typeof OurValues>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
