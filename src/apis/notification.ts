import { axiosRequester } from '@/libs/axios';

import { GetNotificationsParams, GetNotificationsResponse } from './notification.type';

export const getNotifications = async (params?: GetNotificationsParams): Promise<GetNotificationsResponse> => {
  try {
    // cursorId가 존재하지 않으면 params에서 제거
    const { cursorId, ...rest } = params || {};
    const response = await axiosRequester<GetNotificationsResponse>({
      options: {
        method: 'GET',
        url: '/my-notifications',
        params: cursorId ? { cursorId, ...rest } : rest, // cursorId가 있을 때만 추가
      },
      includeAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    throw error;
  }
};

export const deleteNotification = async (notificationId: number): Promise<void> => {
  try {
    await axiosRequester<void>({
      options: {
        method: 'DELETE',
        url: `/my-notifications/${notificationId}`,
      },
      includeAuth: true,
    });
  } catch (error) {
    console.error(`Failed to delete notification with ID ${notificationId}:`, error);
    throw error;
  }
};
