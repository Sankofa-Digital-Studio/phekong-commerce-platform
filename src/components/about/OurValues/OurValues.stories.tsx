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
        imageLabel: 'quality.png',
        title: 'Quality',
        description: 'we source and provide only the best quality herbs and products',
      },
      {
     imageLabel: 'integrity.png', 
        title: 'Integrity',
        description: 'Honest, transparent and ethical in all we do',
      },
      {
        imageLabel: 'community.png', 
        title: 'Community',
        description: 'We care about our community and empower healthier lives together',
      },
    ],
  },
} satisfies Meta<typeof OurValues>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
