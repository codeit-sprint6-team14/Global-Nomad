export interface reservationCardData {
  cursorId: number;
  reservations: Array<reservationCard>;
  totalCount: number;
}
export interface reservationCardActivity {
  bannerImageUrl: string;
  title: string;
  id?: number;
}
export interface reservationCard {
  id?: number;
  teamId?: string;
  userId?: number;
  activity: reservationCardActivity;
  scheduleId?: number;
  status: string;
  reviewSubmitted?: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface myActivitiesCardData {
  cursorId: number;
  totalCount: number;
  activities: Array<myActivityCardData>;
}
export interface myActivityCardData {
  id: string | string[] | undefined;
  userId?: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  address?: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt?: string;
  updatedAt?: string;
}
