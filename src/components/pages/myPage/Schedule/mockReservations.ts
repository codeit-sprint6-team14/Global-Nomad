import { DailyReservation } from './reservation.types';

export const mockReservations: DailyReservation[] = [
  {
    date: '2024-08-09',
    reservations: {
      completed: 1,
      confirmed: 0,
      pending: 0,
    },
  },
  {
    date: '2024-08-15',
    reservations: {
      completed: 0,
      confirmed: 1,
      pending: 2,
    },
  },
];

export default mockReservations;
