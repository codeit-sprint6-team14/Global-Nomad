import { patchReservation } from '@/apis/myPage/myReservations';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservationList'] });
    },
  });
};
