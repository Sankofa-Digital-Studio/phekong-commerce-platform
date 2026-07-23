import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AboutHero } from './AboutHero';

const meta = {
  title: 'M1/Components/About/AboutHero',
  component: AboutHero,
  tags: ['autodocs'],
  args: {
    eyebrow: 'Where Natural Healing Meets Modern Wellness.',
    title: 'About Phekong',
    paragraphs: [
      'Founded in 2006 in Welkom, Free State, Phekong Wellness Centre is dedicated to promoting natural healing and holistic wellness. We believe true well-being comes from caring for the body, mind, and spirit.',
      'By blending traditional herbal knowledge with modern wellness practices, we offer herbal products, therapeutic massage, and holistic care to help individuals and communities live healthier, more balanced lives.',
      'Today, Phekong Wellness Centre is more than a wellness business. We are a trusted partner dedicated to helping individuals and communities embrace healthier living through herbal products, therapeutic massage, and holistic care.',
    ],
  },
} satisfies Meta<typeof AboutHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
