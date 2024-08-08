import { getActivity } from '@/apis/getActivity';
import { Activity } from '@/types/activity';
import { useQuery } from '@tanstack/react-query';

export const useActivityData = (activityId: string) => {
  const {
    data: activityData,
    isLoading,
    error,
  } = useQuery<Activity>({ queryKey: ['activity', activityId], queryFn: () => getActivity({ activityId }) });

  return { activityData, isLoading, error };
};
