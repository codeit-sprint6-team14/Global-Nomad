export type StatusType = 'pending' | 'confirmed' | 'completed' | 'declined' | 'canceled';

const getCardStatus = (status: StatusType): { text: string; colorClass: string } => {
  switch (status) {
    case 'pending':
      return { text: '예약 완료', colorClass: 'text-blue-200' };
    case 'confirmed':
      return { text: '예약 승인', colorClass: 'text-orange-200' };
    case 'completed':
      return { text: '체험 완료', colorClass: 'text-gray-700' };
    case 'declined':
      return { text: '예약 거절', colorClass: 'text-red-200' };
    case 'canceled':
      return { text: '예약 취소', colorClass: 'text-gray-700' };
    default:
      return { text: '상태 미정', colorClass: 'text-gray-500' };
  }
};

export default getCardStatus;
