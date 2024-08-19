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

export type Reservation = {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type ReservationsResponse = {
  cursorId: number;
  totalCount: number;
  reservations: Reservation[];
};
