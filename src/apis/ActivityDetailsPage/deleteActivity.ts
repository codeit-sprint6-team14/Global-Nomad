import { axiosRequester } from '@/libs/axios';
import axios, { AxiosError } from 'axios';

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
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 400) {
        const errorMessage = axiosError.response.data.message;
        if (errorMessage.includes('신청 예약')) {
          throw new Error('신청 예약이 있는 체험은 삭제할 수 없습니다.');
        } else if (errorMessage.includes('확정 예약')) {
          throw new Error('확정 예약이 있는 체험은 삭제할 수 없습니다.');
        }
      }
      throw new Error('체험 삭제 중 오류가 발생했습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
