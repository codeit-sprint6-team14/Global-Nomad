import { patchReservation } from '@/apis/myPage/myReservations';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchReservation,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['myReservations'] });
    },
    onError: (error) => {
      console.error('Patch reservation error:', error);
    },
  });
};
