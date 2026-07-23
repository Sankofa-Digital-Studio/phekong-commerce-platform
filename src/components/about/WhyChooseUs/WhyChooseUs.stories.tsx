import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WhyChooseUs } from './WhyChooseUs';

const meta = {
  title: 'M1/Components/About/WhyChooseUs',
  component: WhyChooseUs,
  tags: ['autodocs'],
  args: {
    title: 'Why Choose us',
    intro:
      "We're committed to providing trusted herbal wellness products and professional massage therapies, backed by knowledge, compassion, and years of experience.",
    items: [
      {
        iconLabel: 'expertise-icon.png',
        iconSrc: '/images/expertise.png',
        title: 'Expertise',
        description:
          'We combine scientific understanding with traditional healing practices to deliver natural wellness solutions you can trust.',
      },
      {
        iconLabel: 'commitment-icon.png',
        iconSrc: '/images/commitment.png',
        title: 'Commitment',
        description: 'We are dedicated to helping every client achieve better health through personalised care and lasting support.',
      },
      {
        iconLabel: 'attention-to-detail-icon.png', 
        iconSrc: '/images/attention-to-detail.png',
        title: 'Attention to detail',
        description: 'Products and wellness service are carefully selected to ensure quality, safety, and effectiveness.',
      },
      {
        iconLabel: 'customer-service-icon.png',
        iconSrc: '/images/customer-service.png',
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