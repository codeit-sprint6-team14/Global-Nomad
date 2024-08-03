import CardFooter from '@/components/Cards/components/cardFooter';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CardFooter> = {
  title: 'Card/CardFooter',
  component: CardFooter,
  argTypes: {
    text: { control: 'text' },
    status: {
      control: 'select',
      options: ['pending', 'completed'],
    },
    imgSrc: { control: 'text' },
    buttonName: { control: 'text' },
    additionalClassNames: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CardFooter>;

export const StatusPendingFooter: Story = {
  args: {
    text: '50,000원',
    status: 'pending',
    buttonName: '예약 취소',
  },
};

export const StatusCompletedFooter: Story = {
  args: {
    text: '50,000원',
    status: 'completed',
    buttonName: '후기 작성',
  },
};

export const MyActivityCardFooter: Story = {
  args: {
    text: '50,000원',
    imgSrc: '/assets/icons/kebab.svg',
  },
};
