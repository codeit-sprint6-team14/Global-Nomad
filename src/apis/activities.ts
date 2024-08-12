import { ActivitiesResponse } from '@/components/pages/main/mainPage.type';
import { Activity } from '@/types/activity';
import axios from 'axios';

const BASE_URL = 'https://sp-globalnomad-api.vercel.app/6-14';

const axiosRequester = axios.create({
  baseURL: BASE_URL,
});

export const getActivities = async (page: number = 1, size: number = 20) => {
  const { data } = await axiosRequester.get<ActivitiesResponse>('/activities', {
    params: {
      method: 'cursor',
      page,
      size,
    },
  });

  return data;
};

export const getActivity = async ({ activityId }: { activityId: string }) => {
  const { data } = await axiosRequester.get<Activity>(`/activities/${activityId}`);

  return data;
};
