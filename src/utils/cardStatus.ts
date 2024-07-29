export type StatusType =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'declined'
  | 'canceled';

const getCardStatus = (status: StatusType) => {
  switch (status) {
    case 'pending':
      return '예약 완료';
    case 'confirmed':
      return '예약 승인';
    case 'completed':
      return '체험 완료';
    case 'declined':
      return '예약 거절';
    case 'canceled':
      return '예약 취소';
    default:
      return '상태 미정';
  }
};

export default getCardStatus;
