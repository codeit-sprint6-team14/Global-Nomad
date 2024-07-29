export interface CardListData {
  cursorId: number;
  reservations: Array<Card>;
  totalCount: number;
}
export interface Activity {
  bannerImageUrl: string;
  title: string;
  id?: number;
}
export interface Card {
  id: number;
  teamId?: string;
  userId?: number;
  activity: Activity;
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

export interface myActivitiesData {
  cursorId: number;
  totalCount: number;
  activities: Array<ActivityCardsDataType>;
}
export interface ActivityCardsDataType {
  id: number;
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
