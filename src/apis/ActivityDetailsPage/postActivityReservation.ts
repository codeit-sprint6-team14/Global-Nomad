import { axiosRequester } from '@/libs/axios';
import { formSubmitDataAtomType } from '@/store/activityDetailsAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

  const submitReservation = ({ activityId, scheduleId, headCount }: formSubmitDataAtomType) => {
    mutation.mutate({ activityId, scheduleId, headCount });
  };

  return { submitReservation, ...mutation };
};
