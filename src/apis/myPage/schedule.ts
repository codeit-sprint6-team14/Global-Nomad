import { axiosRequester } from '@/libs/axios';

import { ActivitiesResponse, ReservationDashboardResponse } from './schedule.types';

export const getMyActivities = async (): Promise<ActivitiesResponse> => {
  try {
    const response = await axiosRequester<ActivitiesResponse>({
      options: {
        method: 'GET',
        url: '/my-activities',
      },
      includeAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    throw error;
  }
};

export const getReservationDashboard = async (
  activityId: string,
  year: number,
  month: number,
): Promise<ReservationDashboardResponse> => {
  try {
    const response = await axiosRequester<ReservationDashboardResponse>({
      options: {
        method: 'GET',
        url: `/my-activities/${activityId}/reservation-dashboard`,
        params: {
          year,
          month,
        },
      },
      includeAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reservation dashboard:', error);
    throw error;
  }
};
