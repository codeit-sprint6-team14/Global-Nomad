import { axiosRequester } from '@/libs/axios';

import {
  ActivitiesResponse,
  ReservationDashboardResponse,
  ReservationScheduleArray,
  ReservationsResponse,
  UpdateReservationsParams,
} from './schedule.types';

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
  activityId: number,
  year: number,
  month: number,
): Promise<ReservationDashboardResponse> => {
  try {
    const formattedMonth = String(month).padStart(2, '0'); // MM 형식으로 인식하도록 두자리형식으로 변환
    const response = await axiosRequester<ReservationDashboardResponse>({
      options: {
        method: 'GET',
        url: `/my-activities/${activityId}/reservation-dashboard`,
        params: {
          year,
          month: formattedMonth,
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

export const getReservationSchedule = async (activityId: number, date: string): Promise<ReservationScheduleArray> => {
  try {
    const response = await axiosRequester<ReservationScheduleArray>({
      options: {
        method: 'GET',
        url: `/my-activities/${activityId}/reserved-schedule`,
        params: {
          date,
        },
      },
      includeAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reservation schedule:', error);
    throw error;
  }
};

export const getReservations = async (
  activityId: number,
  scheduleId: number | null,
  status: 'declined' | 'pending' | 'confirmed',
  cursorId?: number,
  size?: number,
): Promise<ReservationsResponse> => {
  try {
    const response = await axiosRequester<ReservationsResponse>({
      options: {
        method: 'GET',
        url: `/my-activities/${activityId}/reservations`,
        params: {
          scheduleId,
          status,
          cursorId,
          size,
        },
      },
      includeAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reservations:', error);
    throw error;
  }
};

export const updateReservations = async (
  activityId: number,
  reservationId: number,
  status: 'pending' | 'confirmed' | 'declined',
): Promise<UpdateReservationsParams> => {
  try {
    const response = await axiosRequester<UpdateReservationsParams>({
      options: {
        method: 'PATCH',
        url: `/my-activities/${activityId}/reservations/${reservationId}`,
        data: { status },
      },
      includeAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update reservations:', error);
    throw error;
  }
};
