export interface Activity {
  id: number;
  title: string;
  bannerImageUrl: string;
}

export interface Reservation {
  activity: Activity;
  scheduleId: number;
  id: number;
  teamId: string;
  userId: number;
  status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationResponse {
  totalCount: number;
  reservations: Reservation[];
  cursorId: number | null;
}
