import MyActivityCard from '@/components/Cards/myActivityCard';
import { myActivityCardData } from '@/types/cardListData';
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
const MyActivityCardWrapper = ({
  id,
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
}: Omit<myActivityCardData, 'bannerImageUrl'> & { bannerImageUrl: string }) => (
  <MyActivityCard
    myActivityCard={{
      id,
      title,
      price,
      bannerImageUrl,
      rating,
      reviewCount,
    }}
  />
);

const meta: Meta<typeof MyActivityCardWrapper> = {
  title: 'Cards/MyActivityCard',
  component: MyActivityCardWrapper,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'number' },
    title: { control: 'text' },
    price: { control: 'number' },
    bannerImageUrl: {
      control: 'select',
      options: imageOptions,
    },
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    reviewCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof MyActivityCardWrapper>;

export const WithControls: Story = {
  args: {
    id: 1,
    title: '샘플 액티비티',
    price: 50000,
    bannerImageUrl: imageOptions[0],
    rating: 4.5,
    reviewCount: 10,
  },
};
