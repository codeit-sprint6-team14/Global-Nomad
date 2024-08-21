import { patchMyReservation } from '@/apis/myPage/myReservations';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchMyReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchMyReservation,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['myReservations'] });
    },
    onError: (error) => {
      console.error('Patch reservation error:', error);
    },
  });
};
