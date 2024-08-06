import { axiosRequester } from '@/libs/axios';
import { Activity } from '@/types/activity';

export async function getActivity({ activityId }: { activityId: string }) {
  const { data } = await axiosRequester<Activity>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}`,
    },
  });

  return data;
}

export async function getActivityReviewList({ activityId }: { activityId: string }) {
  const { data } = await axiosRequester({
    options: {
      method: 'GET',
      url: `/activities/${activityId}/reviews`,
    },
  });

  return data;
}
