import Filter from '@/components/common/Filter';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Filter>;

const meta: Meta<typeof Filter> = {
  component: Filter,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

const sortOptions = ['예약 신청', '예약 취소', '예약 승인', '예약 거절', '체험 완료'];

export const Default: Story = {
  args: {
    sortOptions,
  },
};
