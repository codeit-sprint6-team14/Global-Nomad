import axios from '@/libs/axios';

const getActivity = async ({ activityId }: { activityId: string }) => {
  const res = await axios.get(`activities/${activityId}`);
  return res.data;
};

export default getActivity;

export const getActivityReviewList = async ({ activityId }: { activityId: string }) => {
  const res = await axios.get(`activities/${activityId}/reviews`);
  return res.data;
};
