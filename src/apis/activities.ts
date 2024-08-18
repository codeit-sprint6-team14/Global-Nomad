import { ActivitiesResponse, GetActivitiesParams } from '@/components/pages/main/mainPage.type';
import { Activity } from '@/types/activity';
import axios from 'axios';

const BASE_URL = 'https://sp-globalnomad-api.vercel.app/6-14';

const axiosRequester = axios.create({
  baseURL: BASE_URL,
});

export const getActivities = async (
  page: number = 1,
  size: number = 20,
  category: string | null = null,
  sortBy: string | null = null,
) => {
  const params: GetActivitiesParams = {
    method: 'offset',
    page,
    size,
  };

  if (category && category !== '') {
    params.category = category;
  }

  if (sortBy) {
    params.sortBy = sortBy;
  }

  const { data } = await axiosRequester.get<ActivitiesResponse>('/activities', {
    params,
  });

  return data;
};

export const getActivity = async ({ activityId }: { activityId: string }) => {
  const { data } = await axiosRequester.get<Activity>(`/activities/${activityId}`);

  return data;
};
