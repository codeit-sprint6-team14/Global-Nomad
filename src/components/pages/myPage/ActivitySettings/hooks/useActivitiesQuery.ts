import { getMyActivities } from '@/apis/myPage/myActivitySettings';
import { MyActivitiesResponse } from '@/apis/myPage/myActivitySettings.types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export const useActivitiesQuery = () => {
  const { fetchNextPage, hasNextPage, error, data } = useInfiniteQuery<
    MyActivitiesResponse,
    Error,
    InfiniteData<MyActivitiesResponse>,
    ['myActivities'],
    number | null
  >({
    queryKey: ['myActivities'],
    queryFn: ({ pageParam = null }) => getMyActivities({ pageParam }),
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
    error,
    setTarget,
  };
};
