import { postReview } from '@/apis/myPage/myReservations';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReviewData {
  rating: number;
  content: string;
}

export const useReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, reviewData }: { reservationId: number | null; reviewData: ReviewData }) =>
      postReview(reservationId, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReservations'] });
    },
    onError: (error) => {
      console.error('Post review error:', error);
    },
  });
};
