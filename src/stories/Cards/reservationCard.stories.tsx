import ReservationCard from '@/components/Cards/reservationCard';
import { reservationCard } from '@/types/cardDataList';
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
  card,
  status,
  bannerImageUrl,
}: {
  card: Omit<reservationCard, 'status' | 'activity'> & {
    activity: Omit<reservationCard['activity'], 'bannerImageUrl'>;
  };
  status: StatusType;
  bannerImageUrl: string;
}) => (
  <ReservationCard
    card={{
      ...card,
      status,
      activity: {
        ...card.activity,
        bannerImageUrl,
      },
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

const baseCard = {
  activity: {
    title: '샘플 액티비티',
  },
  totalPrice: 50000,
  headCount: 2,
  date: '2024-08-15',
  startTime: '14:00',
  endTime: '16:00',
};

export const WithControls: Story = {
  args: {
    card: baseCard,
    status: 'pending',
    bannerImageUrl: imageOptions[0],
  },
};
