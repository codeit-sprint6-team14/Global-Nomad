import ActivitySettings from '@/pages/my-page/activity-settings';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof ActivitySettings>;

const meta: Meta<typeof ActivitySettings> = {
  component: ActivitySettings,
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
