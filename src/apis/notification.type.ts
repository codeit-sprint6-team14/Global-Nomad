export type NotificationType = {
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
  notifications: NotificationType[];
  totalCount: number;
};

export type GetNotificationsParams = {
  cursorId?: number | undefined;
  size?: number;
};
export type AlarmType = {
  id: number;
  content: string;
  dateTime: string;
  status: '승인' | '거절' | '새로 들어왔어요';
  timeAgo: string;
};
