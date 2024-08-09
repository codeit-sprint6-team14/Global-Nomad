import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import ReservationList from '@/pages/my-page/reservation-list';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof ReservationList>;

const meta: Meta<typeof ReservationList> = {
  component: ReservationList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="pt-70">
        <NavBar />
        <Story />
        <Footer />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};
