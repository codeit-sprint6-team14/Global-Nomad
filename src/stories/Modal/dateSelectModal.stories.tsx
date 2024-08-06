import DateSelectModal from '@/components/common/Modal/DateSelect';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof DateSelectModal>;

const meta: Meta<typeof DateSelectModal> = {
  component: DateSelectModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
