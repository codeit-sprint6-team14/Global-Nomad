import Footer from '@/components/common/Footer';
import ReservationList from '@/pages/my-page/reservation-list';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof ReservationList>;

const meta: Meta<typeof ReservationList> = {
  component: ReservationList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Footer />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
