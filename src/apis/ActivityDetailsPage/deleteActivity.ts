import { axiosRequester } from '@/libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
}

export const deleteActivity = async (activityId: string) => {
  const { data } = await axiosRequester({
    options: {
      method: 'DELETE',
      url: `/my-activities/${activityId}`,
    },
    includeAuth: true,
  });
  return data;
};

export const useDeleteActivityMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (activityId: string) => deleteActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const getDeleteErrorMessage = (error: unknown) => {
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

  return { getDeleteErrorMessage, ...mutation };
};
