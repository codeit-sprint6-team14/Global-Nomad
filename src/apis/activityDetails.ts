import { axiosRequester } from '@/libs/axios';
import { formSubmitDataAtomType } from '@/store/activityReservationFormSubmitAtom';
import { Activity } from '@/types/activity';
import { AvailableScheduleTypeProps, DaySchedule } from '@/types/availableSchedulesTypes';
import { ReviewListData } from '@/types/reviewList';

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

export const postActivityReservation = async ({
  activityId,
  formSubmitData,
}: {
  activityId: string;
  formSubmitData: formSubmitDataAtomType;
}) => {
  const { data } = await axiosRequester({
    options: {
      method: 'POST',
      url: `/activities/${activityId}/reservations`,
      data: formSubmitData,
    },
  });

  return data;
};
