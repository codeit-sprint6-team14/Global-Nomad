import { DELETE_ACTIVITY_ERROR_MESSAGES } from '@/constants/errorMessages';
import { axiosRequester } from '@/libs/axios';
import { AxiosError, isAxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

export const deleteActivity = async (activityId: string): Promise<void> => {
  try {
    await axiosRequester({
      options: {
        method: 'DELETE',
        url: `/my-activities/${activityId}`,
      },
      includeAuth: true,
    });
  } catch (error) {
    console.error('Activity deletion error:', error);

    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      switch (axiosError.response?.status) {
        case 400:
          {
            const errorMessage = axiosError.response.data.message;
            if (errorMessage.includes('신청 예약')) {
              throw new Error(DELETE_ACTIVITY_ERROR_MESSAGES.PENDING_RESERVATION);
            }
            if (errorMessage.includes('확정 예약')) {
              throw new Error(DELETE_ACTIVITY_ERROR_MESSAGES.CONFIRMED_RESERVATION);
            }
          }
          break;
        case 401:
          throw new Error(DELETE_ACTIVITY_ERROR_MESSAGES.UNAUTHORIZED);
        case 403:
          throw new Error(DELETE_ACTIVITY_ERROR_MESSAGES.FORBIDDEN);
        case 404:
          throw new Error(DELETE_ACTIVITY_ERROR_MESSAGES.NOT_FOUND);
        default:
          throw new Error(DELETE_ACTIVITY_ERROR_MESSAGES.DEFAULT);
      }
    }
  }
};
