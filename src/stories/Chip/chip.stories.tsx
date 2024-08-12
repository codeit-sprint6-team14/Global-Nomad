import Chip from '@/components/common/Chip';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Chip>;

const meta: Meta<typeof Chip> = {
  component: Chip,
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
    },
    type: {
      control: {
        type: 'select',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Seat: Story = {
  args: { type: 'seat' },
  render: (args) => <Chip {...args}>잔여 3</Chip>,
};

export const Reserved: Story = {
  args: { type: 'pending' },
  render: (args) => <Chip {...args}>예약 3</Chip>,
};

export const Completed: Story = {
  args: { type: 'completed' },
  render: (args) => <Chip {...args}>완료 3</Chip>,
};

export const Confirmed: Story = {
  args: { type: 'confirmed' },
  render: (args) => <Chip {...args}>확정 3</Chip>,
};
