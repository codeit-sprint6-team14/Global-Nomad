import { axiosRequester } from '@/libs/axios';
import { formSubmitDataAtomType } from '@/store/activityDetailsAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const postActivityReservation = async ({ activityId, scheduleId, headCount }: formSubmitDataAtomType) => {
  const { data } = await axiosRequester({
    options: {
      method: 'POST',
      url: `/activities/${activityId}/reservations`,
      data: { scheduleId, headCount },
    },
    includeAuth: true,
  });

  return data;
};

export const useActivityReservationMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ activityId, scheduleId, headCount }: formSubmitDataAtomType) =>
      postActivityReservation({ activityId, scheduleId, headCount }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservation'] });
    },
  });

  interface ErrorResponse {
    message: string;
  }

  const getErrorMessage = (error: unknown) => {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ErrorResponse>;
      switch (axiosError.response?.status) {
        case 401:
          return '로그인 시간이 만료됐습니다.';
        default:
          return axiosError.response?.data.message || '예약 중 오류가 발생했습니다.';
      }
    }
    return '예약 중 오류가 발생했습니다.';
  };

  return { getErrorMessage, ...mutation };
};
