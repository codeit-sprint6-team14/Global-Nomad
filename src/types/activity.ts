export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImages: Array<SubImage>;
  schedules: Array<Schedules>;
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
export type SubImage = {
  id: number;
  imageUrl: string;
};
export type Schedules = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

export type HeaderProps = {
  myId: number;
  title: string;
  rating: number;
  userId: number;
  address: string;
  category: string;
  activityId: string;
  reviewCount: number;
  handleDeleteConfirmation: () => void;
};
