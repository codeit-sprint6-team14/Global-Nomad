import EmptyContent from '@/components/pages/myPage/ReservationList/emptyContent';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof EmptyContent>;

const meta: Meta<typeof EmptyContent> = {
  component: EmptyContent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
