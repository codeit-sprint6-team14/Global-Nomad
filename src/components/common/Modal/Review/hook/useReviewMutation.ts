import { postReview } from '@/apis/myPage/myReservations';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReviewData {
  rating: number;
  content: string;
}

interface MutationParams {
  reservationId: number | null;
  reviewData: ReviewData;
}

export const useReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, reviewData }: MutationParams) => postReview(reservationId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
    onError: (error) => {
      console.error('Post review error:', error);
    },
  });
};
