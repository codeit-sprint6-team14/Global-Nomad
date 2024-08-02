import CardHeader from '@/components/Cards/components/cardHeader';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CardHeader> = {
  title: 'Card/CardHeader',
  component: CardHeader,
  argTypes: {
    text: { control: 'text' },
    imgSrc: { control: 'text' },
    ClassNames: {
      control: 'select',
      options: [
        'text-gray-700',
        'text-black',
        'text-green-200',
        'text-green-300',
        'text-red-200',
        'text-orange-200',
        'text-yellow',
        'text-blue-200',
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof CardHeader>;

export const MyActivityCardHeader: Story = {
  args: {
    text: '4.5 (120)',
    imgSrc: '/assets/icons/star.svg',
  },
};

export const Pending: Story = {
  args: {
    text: '예약 완료',
    ClassNames: 'text-blue-200',
  },
};

export const Confirmed: Story = {
  args: {
    text: '예약 승인',
    ClassNames: 'text-orange-200',
  },
};

export const Completed: Story = {
  args: {
    text: '체험 완료',
    ClassNames: 'text-gray-700',
  },
};

export const Declined: Story = {
  args: {
    text: '예약 거절',
    ClassNames: 'text-red-200',
  },
};

export const Canceled: Story = {
  args: {
    text: '예약 취소',
    ClassNames: 'text-gray-700',
  },
};
