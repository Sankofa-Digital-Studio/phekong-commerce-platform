import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WhyChooseUs } from './WhyChooseUs';

const meta = {
  title: 'M1/Components/About/WhyChooseUs',
  component: WhyChooseUs,
  tags: ['autodocs'],
  args: {
    title: 'Why Choose Us',
    intro:
      "We're committed to providing trusted herbal wellness products and professional massage therapies, backed by knowledge, compassion, and years of experience.",
    items: [
    {
  image: {
    src: "/images/expertise.png",
    alt: "Expertise icon",
  },
  title: "Expertise",
  description:
    "We combine traditional wellness knowledge with responsible modern practices.",
},
      {
       image: {
  src: "/images/commitment.png",
  alt: "Commitment icon",
},
        title: 'Commitment',
        description: 'We are dedicated to helping every client achieve better health through personalised care and lasting support.',
      },
      {
        image: {
  src: "/images/attention-to-detail.png",
  alt: "Attention to detail icon",
},
        title: 'Attention to Detail',
        description: 'Products and wellness service are carefully selected to ensure quality, safety, and effectiveness.',
      },
      {
       image: {
  src: "/images/customer-service.png",
  alt: "Customer service icon",
},
        title: 'Customer Service',
        description: 'Our team is always ready to answer your questions and guide you on your wellness journey.',
      },
    ],
  },
} satisfies Meta<typeof WhyChooseUs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};