import TextArea from '@/components/common/TextArea';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof TextArea>;

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
