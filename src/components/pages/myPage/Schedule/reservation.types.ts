export interface DailyReservation {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}
