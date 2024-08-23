export interface Activity {
  id: number;
  title: string;
  bannerImageUrl: string;
}

export interface MyReservation {
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

export interface MyReservationResponse {
  totalCount: number;
  reservations: MyReservation[];
  cursorId: number | null;
}
