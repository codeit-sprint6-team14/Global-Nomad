import { getActivityById } from '@/apis/myPage/myActivitySettings';
import { useQuery } from '@tanstack/react-query';

export const useActivityByIdQuery = (activityId: string | string[] | undefined) => {
  return useQuery({
    queryKey: ['myActivityById', activityId],
    queryFn: () => (activityId ? getActivityById(activityId) : null),
    enabled: activityId !== null,
  });
};
