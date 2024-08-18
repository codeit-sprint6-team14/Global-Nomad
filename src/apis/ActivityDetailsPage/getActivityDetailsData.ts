import { axiosRequester } from '@/libs/axios';
import { Activity } from '@/types/activity';
import { useQuery } from '@tanstack/react-query';

export const getActivityDetailsData = async ({ activityId }: { activityId: string }) => {
  const { data } = await axiosRequester<Activity>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}`,
    },
  });

  return data;
};

export const useActivityData = (activityId: string) => {
  const {
    data: activityData,
    isLoading,
    error,
  } = useQuery<Activity>({ queryKey: ['activity', activityId], queryFn: () => getActivityDetailsData({ activityId }) });

  return { activityData, isLoading, error };
};
