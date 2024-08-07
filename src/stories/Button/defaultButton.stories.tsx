import DefaultButton from '@/components/common/Button/defaultButton';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof DefaultButton>;

const meta: Meta<typeof DefaultButton> = {
  component: DefaultButton,
  argTypes: {
    variant: {
      control: {
        options: ['primary', 'secondary'],
        type: 'select',
      },
    },
  },
  args: {
    onClick: fn(),
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    variant: 'primary',
    disabled: false,
  },
  render: (args) => {
    return <DefaultButton {...args}>Default Button</DefaultButton>;
  },
};
