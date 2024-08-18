import { axiosRequester } from '@/libs/axios';
import { AvailableScheduleTypeProps, DaySchedule } from '@/types/availableSchedulesTypes';
import { useQuery } from '@tanstack/react-query';

export const getActivityAvailableSchedule = async ({ activityId, year, month }: AvailableScheduleTypeProps) => {
  const { data } = await axiosRequester<DaySchedule[]>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}/available-schedule?year=${year}&month=${month}`,
    },
  });

  return data;
};

export const useActivityAvailableSchedule = ({ activityId, year, month }: AvailableScheduleTypeProps) => {
  const {
    data: availableSchedule,
    isLoading,
    error,
  } = useQuery<DaySchedule[]>({
    queryKey: ['AvailableSchedule', activityId, year, month],
    queryFn: () => getActivityAvailableSchedule({ activityId, year, month }),
    enabled: !!activityId && !!year && !!month,
  });

  return { availableSchedule, isLoading, error };
};
