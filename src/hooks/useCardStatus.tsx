import { useEffect, useState } from 'react';

export type StatusType =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'declined'
  | 'canceled';

const useCardStatus = (status: StatusType) => {
  const [statusText, setStatusText] = useState('');

  useEffect(() => {
    switch (status) {
      case 'pending':
        setStatusText('예약 완료');
        break;
      case 'confirmed':
        setStatusText('예약 승인');
        break;
      case 'completed':
        setStatusText('체험 완료');
        break;
      case 'declined':
        setStatusText('예약 거절');
        break;
      case 'canceled':
        setStatusText('예약 취소');
        break;
      default:
        setStatusText('상태 미정');
    }
  }, [status]);

  return statusText;
};

export default useCardStatus;
