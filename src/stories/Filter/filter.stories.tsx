import Filter from '@/components/common/Filter';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Filter>;

const meta: Meta<typeof Filter> = {
  component: Filter,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    selectedOption: {
      control: 'select',
      options: [null, 'pending', 'canceled', 'confirmed', 'declined', 'completed'],
    },
    onOptionSelect: { action: 'optionSelected' },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    content: '필터',
    selectedOption: null,
  },
};

export const WithSelectedOption: Story = {
  args: {
    content: '필터',
    selectedOption: 'pending',
  },
};
