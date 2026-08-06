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
        title: 'Herbal Products',
        items: ['Herbal Juices', 'Herbal Teas', 'Super Natural Therapy Lab', 'Super Natural Beauty lab', 'Food Cures'],
        image: {
  src: "/images/herbal-products.png",
  alt: "Selection of Phekong herbal wellness products",
},
      },
      {
        title: 'Massages',
        items: ['Full Body', 'Half Body', 'Foot', 'Herbal Detox'],
       image: {
    src: "/images/massage.png",
    alt: "Massage services offered at Phekong Wellness Centre",
  },
      },
    ],
  },
} satisfies Meta<typeof ProductsServices>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
