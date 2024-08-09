import { axiosRequester } from '@/libs/axios';
import { Activity } from '@/types/activity';
import { ReviewListData } from '@/types/reviewList';

export async function getActivity({ activityId }: { activityId: string }) {
  const { data } = await axiosRequester<Activity>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}`,
    },
  });

  return data;
}

export async function getActivityReviewList({
  activityId,
  page,
  size,
}: {
  activityId: string;
  page: number;
  size: number;
}) {
  const { data } = await axiosRequester<ReviewListData>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}/reviews?page=${page}&size=${size}`,
    },
  });

  return data;
}
