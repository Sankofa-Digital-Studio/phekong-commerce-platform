import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ContactPage from './page';

const meta = {
  title: 'Pages/Contact',
  component: ContactPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ContactPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GeneralEnquiry: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: {},
      },
    },
  },
};

export const ProductEnquiry: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: {
          productName: 'Restorative Body Oil',
          productId: 'restorative-body-oil',
        },
      },
    },
  },
};

export const WholesaleEnquiry: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: {
          intent: 'wholesale',
        },
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
