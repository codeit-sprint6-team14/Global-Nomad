import { DailyReservation } from '@/types/reservationTypes';

export const getCircleColor = (reservation?: DailyReservation['reservations']) => {
  if (reservation) {
    if (reservation.completed > 0) {
      return 'bg-gray-800'; // 완료된 예약
    }
    if (reservation.confirmed > 0 && reservation.pending > 0) {
      return 'bg-blue-300'; // 승인 및 대기 중 예약
    }
    if (reservation.confirmed > 0) {
      return 'bg-orange-200'; // 승인된 예약
    }
    if (reservation.pending > 0) {
      return 'bg-blue-300'; // 대기 중인 예약
    }
  }
  return '';
};
