import Mobile from '@/components/FloatingBox/mobile';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Mobile>;

const meta: Meta<typeof Mobile> = {
  component: Mobile,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
