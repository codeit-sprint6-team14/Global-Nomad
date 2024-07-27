import { Card } from '@/types/CardListData';

const CardsData: Card[] = [
  {
    id: 1,
    activity: {
      bannerImageUrl: '/images/testImg/air-balloon.png',
      title: '열기구 타면서 하늘을 날아보자',
      id: 1,
    },
    status: 'pending', // 예약 완료
    totalPrice: 10000,
    headCount: 10,
    date: '2024. 2. 14',
    startTime: '11:00',
    endTime: '12:30',
  },
  {
    id: 2,
    activity: {
      bannerImageUrl: '/images/testImg/dance.png',
      title:
        '함께 배우면 즐거운 스트릿 댄스 하지만 오랜 뒤에 난 울고있었어 내게 들었던 아픔을 되돌려받으며~~~',
      id: 2,
    },
    status: 'confirmed', // 예약 승인
    totalPrice: 10000,
    headCount: 10,
    date: '2024. 2. 14',
    startTime: '11:00',
    endTime: '12:30',
  },
  {
    id: 3,
    activity: {
      bannerImageUrl: '/images/testImg/dog.png',
      title: '우리집 강아지 인생샷 찍어주기',
      id: 3,
    },
    status: 'completed', // 체험 완료
    totalPrice: 10000,
    headCount: 10,
    date: '2024. 2. 14',
    startTime: '11:00',
    endTime: '12:30',
  },
  {
    id: 4,
    activity: {
      bannerImageUrl: '/images/testImg/fish.png',
      title: '니모를 찾아서 스노쿨링',
      id: 4,
    },
    status: 'declined', // 예약 거절
    totalPrice: 10000,
    headCount: 10,
    date: '2024. 2. 14',
    startTime: '11:00',
    endTime: '12:30',
  },
  {
    id: 5,
    activity: {
      bannerImageUrl: '/images/testImg/village.png',
      title: '알록달록 바다가 있는 마을에서 힐링',
      id: 5,
    },
    status: 'canceled', // 예약 취소
    totalPrice: 10000,
    headCount: 10,
    date: '2024. 2. 14',
    startTime: '11:00',
    endTime: '12:30',
  },
];

export default CardsData;
