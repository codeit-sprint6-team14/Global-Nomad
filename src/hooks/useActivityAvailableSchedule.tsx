import { getActivityAvailableSchedule } from '@/apis/activityDetails';
import { AvailableScheduleTypeProps, DaySchedule } from '@/types/availableSchedulesTypes';
import { useQuery } from '@tanstack/react-query';

export const useActivityAvailableSchedule = ({ activityId, year, month }: AvailableScheduleTypeProps) => {
  const {
    data: availableSchedule,
    isLoading,
    error,
  } = useQuery<DaySchedule[]>({
    queryKey: ['AvailableSchedule', activityId],
    queryFn: () => getActivityAvailableSchedule({ activityId, year, month }),
  });

  return { availableSchedule, isLoading, error };
};
