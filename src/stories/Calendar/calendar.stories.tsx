/* eslint-disable react-hooks/rules-of-hooks */
import Calendar from '@/components/Calendar';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

type StoryProps = ComponentProps<typeof Calendar>;

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    selectedDate: new Date(),
    availableDates: [
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 1)),
      new Date(new Date().setDate(new Date().getDate() + 10)),
      new Date(new Date().setDate(new Date().getDate() + 20)),
    ],
    updateMonthChange: action('month changed'),
    updateDateSelect: action('date changed'),
  },
  render: (args: StoryProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(args.selectedDate);

    const handleUpdateDateSelect = (date: Date | null) => {
      setSelectedDate(date);
      args.updateDateSelect(date);
    };

    return <Calendar {...args} selectedDate={selectedDate} updateDateSelect={handleUpdateDateSelect} />;
  },
};
