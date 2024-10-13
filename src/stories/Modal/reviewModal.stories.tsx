import { Reservation } from '@/apis/myPage/myReservations.types';
import Modal from '@/components/common/Modal';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<typeof Modal.Review> = {
  component: Modal.Review,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F8F8F8' },
        { name: 'dark', value: '#333333' },
      ],
    },
    layout: 'fullscreen',
    tags: ['autodocs'],
  },
  decorators: [
    (Story) => (
      <div
        style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal.Review>;

const Template: Story = {
  render: (args) => <Modal.Review {...args} />,
};

const baseSelectedCard: Reservation = {
  id: 1,
  scheduleId: 1,
  teamId: 'team1',
  userId: 1,
  status: 'confirmed',
  reviewSubmitted: false,
  totalPrice: 10000,
  headCount: 10,
  date: '2023. 2. 14',
  startTime: '11:00',
  endTime: '12:30',
  createdAt: '2023-02-14T11:00:00Z',
  updatedAt: '2023-02-14T11:00:00Z',
  activity: {
    id: 1,
    title: '함께 배우면 즐거운 스트릿 댄스',
    bannerImageUrl: '/public/assets/images/testImg/air-balloon.png',
  },
};

export const Default: Story = {
  ...Template,
  args: {
    selectedCard: baseSelectedCard,
    onClose: () => console.log('Modal closed'),
  },
  parameters: {
    docs: {
      description: {
        story: '기본적인 리뷰 모달의 모습입니다.',
      },
    },
  },
};

export const Secondary: Story = {
  ...Template,
  args: {
    selectedCard: {
      ...baseSelectedCard,
      activity: {
        ...baseSelectedCard.activity,
        title: '해안가 마을에서 1주일 살아보기',
        bannerImageUrl: '/assets/images/testImg/village.png',
      },
      date: '2024. 8. 2',
      startTime: '14:00',
      endTime: '16:30',
      totalPrice: 360000,
      headCount: 4,
    },
    onClose: () => console.log('Modal closed'),
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '다른 내용의 리뷰 모달입니다. 어두운 배경에서 표시됩니다.',
      },
    },
  },
};

export const SmallScreen: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'sm',
    },
    docs: {
      description: {
        story: '모바일 화면에서의 리뷰 모달 모습입니다.',
      },
    },
  },
};

export const MediumScreen: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'md',
    },
    docs: {
      description: {
        story: '태블릿 화면에서의 리뷰 모달 모습입니다.',
      },
    },
  },
};

export const LargeScreen: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'lg',
    },
    docs: {
      description: {
        story: '데스크탑 화면에서의 리뷰 모달 모습입니다.',
      },
    },
  },
};
