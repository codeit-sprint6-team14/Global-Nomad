import Desktop from '@/components/FloatingBox/desktop';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Desktop>;

const meta: Meta<typeof Desktop> = {
  component: Desktop,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
