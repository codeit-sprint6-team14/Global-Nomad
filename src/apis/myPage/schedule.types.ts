export type Activity = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ActivitiesResponse = {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
};

export type ReservationDashboardResponse = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}[];

export type ReservationSchedule = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
};

export type ReservationScheduleArray = ReservationSchedule[];
