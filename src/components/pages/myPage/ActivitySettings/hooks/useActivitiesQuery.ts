import { getMyActivities } from '@/apis/myPage/myActivitySettings';
import { MyActivitiesResponse } from '@/apis/myPage/myActivitySettings.types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useActivitiesQuery = () => {
  const queryClient = useQueryClient();
  const { fetchNextPage, hasNextPage, error, data, refetch } = useInfiniteQuery<
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

  useEffect(() => {
    refetch();

    return () => {
      queryClient.removeQueries({ queryKey: ['myActivities'] });
    };
  }, [refetch, queryClient]);

  return {
    activitiesData,
    isActivityEmpty,
    error,
    setTarget,
  };
};
