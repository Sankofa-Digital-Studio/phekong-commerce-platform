import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatsBar } from './StatsBar';

const meta = {
  title: 'M1/Components/About/StatsBar',
  component: StatsBar,
  tags: ['autodocs'],
  args: {
    stats: [
      { icon: 'calendar', value: '20 years', label: 'of experience' },
      { icon: 'leaf', value: '100%', label: 'wellness solutions' },
      { icon: 'heart', value: 'Trust', label: '& Care' },
    ],
  },
} satisfies Meta<typeof StatsBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
