import { axiosRequester } from '@/libs/axios';

import {
  ActivityFormData,
  ActivityFormDataResponse,
  ImageUploadResponse,
  MyActivitiesResponse,
  PatchActivityFormData,
} from './myActivitySettings.types';

export const postImageToUrl = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data } = await axiosRequester<ImageUploadResponse, FormData>({
    options: {
      method: 'POST',
      url: 'activities/image',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    includeAuth: true,
  });

  return data;
};

export const postActivity = async (formData: ActivityFormData) => {
  const { data } = await axiosRequester({
    options: {
      method: 'POST',
      url: 'activities',
      data: formData,
    },
    includeAuth: true,
  });

  return data;
};

export const getMyActivities = async ({ pageParam = null }: { pageParam: number | null }) => {
  const { data } = await axiosRequester<MyActivitiesResponse>({
    options: {
      method: 'GET',
      url: 'my-activities',
      params: { size: 5, cursorId: pageParam },
    },
    includeAuth: true,
  });

  return data;
};

export const getActivityById = async (activityId: string | string[] | undefined) => {
  const { data } = await axiosRequester<ActivityFormDataResponse>({
    options: {
      method: 'GET',
      url: `activities/${activityId}`,
    },
    includeAuth: true,
  });

  return data;
};

export const deleteActivity = async (activityId: string | string[] | undefined) => {
  const { data } = await axiosRequester({
    options: {
      method: 'DELETE',
      url: `my-activities/${activityId}`,
    },
    includeAuth: true,
  });

  return data;
};

export const patchActivity = async (activityId: string | string[] | undefined, formData: PatchActivityFormData) => {
  const { data } = await axiosRequester<ActivityFormDataResponse>({
    options: {
      method: 'PATCH',
      url: `my-activities/${activityId}`,
      data: formData,
    },
    includeAuth: true,
  });

  return data;
};
