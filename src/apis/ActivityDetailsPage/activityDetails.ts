import { axiosRequester } from '@/libs/axios';
import { formSubmitDataAtomType } from '@/store/activityDetailsAtom';
import { Activity, MyInformation } from '@/types/activity';
import { AvailableScheduleTypeProps, DaySchedule } from '@/types/availableSchedulesTypes';
import { ReviewListData } from '@/types/reviewList';
import { useQuery } from '@tanstack/react-query';

export const getActivity = async ({ activityId }: { activityId: string }) => {
  const { data } = await axiosRequester<Activity>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}`,
    },
  });

  return data;
};

export const getActivityAvailableSchedule = async ({ activityId, year, month }: AvailableScheduleTypeProps) => {
  const { data } = await axiosRequester<DaySchedule[]>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}/available-schedule?year=${year}&month=${month}`,
    },
  });

  return data;
};

export const getActivityReviewList = async ({
  activityId,
  page,
  size,
}: {
  activityId: string;
  page: number;
  size: number;
}) => {
  const { data } = await axiosRequester<ReviewListData>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}/reviews?page=${page}&size=${size}`,
    },
  });

  return data;
};

export const postActivityReservation = async ({ activityId, scheduleId, headCount }: formSubmitDataAtomType) => {
  const { data } = await axiosRequester({
    options: {
      method: 'POST',
      url: `/activities/${activityId}/reservations`,
      data: { scheduleId, headCount },
    },
    includeAuth: true,
  });

  return data;
};

export const getMyInformation = async () => {
  const { data } = await axiosRequester<MyInformation>({
    options: {
      method: 'GET',
      url: `/users/me`,
    },
    includeAuth: true,
  });

  return data;
};

export const useMyInformation = () => {
  const {
    data: userInformationData,
    isLoading,
    error,
  } = useQuery<MyInformation>({ queryKey: ['userInformation'], queryFn: () => getMyInformation() });

  return { userInformationData, isLoading, error };
};
