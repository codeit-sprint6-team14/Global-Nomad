import { ActivitiesResponse, GetActivitiesParams } from '@/components/pages/main/mainPage.type';
import { Activity } from '@/types/activity';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
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
  searchTerm: string | null = null,
): Promise<ActivitiesResponse> => {
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

  if (searchTerm) {
    params.search = searchTerm;
  }

  const { data } = await axiosRequester.get<ActivitiesResponse>('/activities', {
    params,
  });

  return data;
};

export const useActivities = (
  page: number,
  size: number,
  category: string | null,
  sortBy: string | null,
  searchTerm: string | null,
): UseQueryResult<ActivitiesResponse, Error> => {
  return useQuery({
    queryKey: ['activities', page, size, category, sortBy, searchTerm],
    queryFn: () => getActivities(page, size, category, sortBy, searchTerm),
    placeholderData: (previousData) => previousData,
  });
};

export const getActivity = async ({ activityId }: { activityId: string }): Promise<Activity> => {
  const { data } = await axiosRequester.get<Activity>(`/activities/${activityId}`);
  return data;
};

export const useActivity = (activityId: string): UseQueryResult<Activity, Error> => {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivity({ activityId }),
  });
};
