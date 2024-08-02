import CardTitle from '@/components/Cards/components/cardTitle';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CardTitle> = {
  title: 'Card/CardTitle',
  component: CardTitle,
  argTypes: {
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CardTitle>;

export const Default: Story = {
  args: {
    title: 'Card Title',
  },
};
