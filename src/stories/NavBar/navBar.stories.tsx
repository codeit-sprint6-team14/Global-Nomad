import NavBar from '@/components/NavBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NavBar> = {
  title: 'Components/NavBar',
  component: NavBar,
  argTypes: {
    accessToken: {
      options: [true, false],
      control: { type: 'boolean' },
    },
  },
  parameters: {
    backgrounds: {
      default: { name: 'white', value: '#ffffff' },
      values: [
        { name: 'black', value: '#1B1B1B' },
        { name: 'yellow', value: '#FFC23D' },
        { name: 'red200', value: '#FF472E' },
        { name: 'gray200', value: '#EEEEEE' },
        { name: 'blue200', value: '#2EB4FF' },
        { name: 'green200', value: '#00AC07' },
      ],
    },
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {
    accessToken: true,
  },
};

export const LoggedIn: Story = {
  args: {
    accessToken: true,
  },
};

export const LoggedOut: Story = {
  args: {
    accessToken: false,
  },
};
