import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductsServices } from './ProductsServices';

const meta = {
  title: 'M1/Components/About/ProductsServices',
  component: ProductsServices,
  tags: ['autodocs'],
  args: {
    title: 'Our Products & Services',
    panels: [
      {
        title: 'Herbal products',
        items: ['Herbal Juices', 'Herbal Teas', 'Therapy Lab', 'Beauty lap', 'Food Cures'],
        imageLabel: 'herbal-products.png',
      },
      {
        title: 'Massages',
        items: ['Full Body', 'Half Body', 'Foot', 'Herbal Detox'],
        imageLabel: 'massage.png',
      },
    ],
  },
} satisfies Meta<typeof ProductsServices>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
