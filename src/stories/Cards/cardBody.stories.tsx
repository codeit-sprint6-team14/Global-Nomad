import CardBody from '@/components/Cards/components/cardBody';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CardBody> = {
  title: 'Card/CardBody',
  component: CardBody,
  argTypes: {
    text: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CardBody>;

export const Default: Story = {
  args: {
    text: '2024. 2. 14 · 11:00 - 12:30 · 10명',
  },
};
