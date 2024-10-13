import { getMyActivities } from '@/apis/myPage/myActivitySettings';
import { MyActivitiesResponse } from '@/apis/myPage/myActivitySettings.types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useToast from '@/hooks/useToast';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import { useEffect } from 'react';

export const useActivitiesQuery = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { fetchNextPage, hasNextPage, error, data, refetch } = useInfiniteQuery<
    MyActivitiesResponse,
    AxiosError,
    InfiniteData<MyActivitiesResponse>,
    ['myActivities'],
    number | null
  >({
    queryKey: ['myActivities'],
    queryFn: ({ pageParam = null }) => getMyActivities({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const { divRef } = useIntersectionObserver({
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

  useEffect(() => {
    if (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error('인증에 실패했습니다. 다시 로그인해주세요.');
        } else {
          toast.error(error.message || '데이터를 불러오는 데 실패했습니다.');
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [error, toast]);

  return {
    activitiesData,
    isActivityEmpty,
    error,
    divRef,
  };
};
