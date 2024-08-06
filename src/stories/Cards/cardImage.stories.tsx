import CardImage from '@/components/common/Cards/components/cardImage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CardImage> = {
  title: 'Card/CardImage',
  component: CardImage,
  argTypes: {
    imageUrl: {
      options: [
        '/assets/images/testImg/air-balloon.png',
        '/assets/images/testImg/dance.png',
        '/assets/images/testImg/dog.png',
        '/assets/images/testImg/fish.png',
        '/assets/images/testImg/village.png',
      ],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardImage>;

export const Default: Story = {
  args: {
    imageUrl: '/assets/images/testImg/air-balloon.png',
  },
};
