import EmptyReservationContent from '@/components/pages/myPage/ReservationList/emptyReservationContent';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof EmptyReservationContent>;

const meta: Meta<typeof EmptyReservationContent> = {
  component: EmptyReservationContent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
