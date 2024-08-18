import { getMyActivities } from '@/apis/myPage/myActivitySettings';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useActivitiesQuery = () => {
  const { fetchNextPage, hasNextPage, status, error, data } = useInfiniteQuery({
    queryKey: ['myActivities'],
    queryFn: getMyActivities,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const activitiesData = data?.pages.flatMap((page) => page.activities) || [];
  const isActivityEmpty = activitiesData.length === 0;

  return {
    activitiesData,
    isActivityEmpty,
    status,
    error,
    setTarget,
  };
};
