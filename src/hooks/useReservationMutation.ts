import { postActivityReservation } from '@/apis/activityDetails';
import { formSubmitDataAtomType } from '@/store/activityDetailsAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
