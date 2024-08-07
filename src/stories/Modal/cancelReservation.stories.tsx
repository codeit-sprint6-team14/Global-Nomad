import CancelReservation from '@/components/common/Modal/CancelReservation';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof CancelReservation>;

const meta: Meta<typeof CancelReservation> = {
  component: CancelReservation,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
