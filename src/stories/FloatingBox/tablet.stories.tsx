import Tablet from '@/components/FloatingBox/tablet';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Tablet>;

const meta: Meta<typeof Tablet> = {
  component: Tablet,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
