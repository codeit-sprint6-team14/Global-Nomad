import { postActivityReservation } from '@/apis/activityDetails';
import { formSubmitDataAtomType } from '@/store/activityDetailsAtom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useActivityReservationMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ activityId, formSubmitData }: { activityId: string; formSubmitData: formSubmitDataAtomType }) =>
      postActivityReservation({ activityId, formSubmitData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservation'] });
    },
  });

  const submitReservation = (activityId: string, formSubmitData: formSubmitDataAtomType) => {
    mutation.mutate({ activityId, formSubmitData });
  };

  return { submitReservation, ...mutation };
};
