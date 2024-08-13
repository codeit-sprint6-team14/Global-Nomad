import RegistActivity from '@/pages/my-page/regist-activity';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof RegistActivity>;

const meta: Meta<typeof RegistActivity> = {
  component: RegistActivity,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
