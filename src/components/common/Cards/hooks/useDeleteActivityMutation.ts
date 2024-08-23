import { deleteActivity } from '@/apis/myPage/myActivitySettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteActivityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
    },
    onError: (error) => {
      console.error('Delete activity error:', error);
    },
  });
};
