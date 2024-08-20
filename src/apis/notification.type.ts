export type Notification = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type GetNotificationsResponse = {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
};

export type GetNotificationsParams = {
  cursorId?: number;
  size?: number;
};
