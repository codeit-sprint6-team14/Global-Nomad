import { MyReservation } from '@/apis/myPage/myReservations.types';
import ReservationCard from '@/components/common/Cards/reservationCard';
import { StatusType } from '@/utils/cardStatus';
import type { Meta, StoryObj } from '@storybook/react';

// 이미지 옵션 리스트
const imageOptions = [
  '/assets/images/testImg/air-balloon.png',
  '/assets/images/testImg/dance.png',
  '/assets/images/testImg/dog.png',
  '/assets/images/testImg/fish.png',
  '/assets/images/testImg/village.png',
];

// 래퍼 컴포넌트 정의
const ReservationCardWrapper = ({
  myReservationData,
  status,
  bannerImageUrl,
}: {
  myReservationData: Omit<MyReservation, 'status' | 'activity'> & {
    activity: Omit<MyReservation['activity'], 'bannerImageUrl'>;
  };
  status: StatusType;
  bannerImageUrl: string;
}) => (
  <ReservationCard
    myReservationData={{
      ...myReservationData,
      status,
      activity: {
        ...myReservationData.activity,
        bannerImageUrl,
      },
    }}
    onCardClick={function (): void {
      throw new Error('Function not implemented.');
    }}
  />
);

const meta: Meta<typeof ReservationCardWrapper> = {
  title: 'Cards/ReservationCard',
  component: ReservationCardWrapper,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'confirmed', 'completed', 'declined', 'canceled'],
    },
    bannerImageUrl: {
      control: 'select',
      options: imageOptions,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReservationCardWrapper>;

const baseReservation: Omit<MyReservation, 'status' | 'activity'> & {
  activity: Omit<MyReservation['activity'], 'bannerImageUrl'>;
} = {
  id: 1,
  scheduleId: 1,
  teamId: 'team1',
  userId: 1,
  reviewSubmitted: false,
  totalPrice: 50000,
  headCount: 2,
  date: '2024-08-15',
  startTime: '14:00',
  endTime: '16:00',
  createdAt: '2023-08-15T14:00:00Z',
  updatedAt: '2023-08-15T14:00:00Z',
  activity: {
    id: 1,
    title: '샘플 액티비티',
  },
};

export const WithControls: Story = {
  args: {
    myReservationData: baseReservation,
    status: 'pending',
    bannerImageUrl: imageOptions[0],
  },
};
