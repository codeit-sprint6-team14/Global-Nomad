import { getMyReservations } from '@/apis/myPage/myReservations';
import { MyReservationResponse } from '@/apis/myPage/myReservations.types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useToast from '@/hooks/useToast';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useMyReservationsQuery = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const toast = useToast();

  const { fetchNextPage, hasNextPage, error, data, refetch } = useInfiniteQuery<
    MyReservationResponse,
    AxiosError,
    InfiniteData<MyReservationResponse>,
    ['myReservations', string | null],
    number | null
  >({
    queryKey: ['myReservations', selectedStatus],
    queryFn: ({ pageParam = null }) => getMyReservations({ pageParam, status: selectedStatus }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const handleStatusChange = (newStatus: string | null) => {
    setSelectedStatus(newStatus);
  };

  const myReservationsData = data?.pages.flatMap((page) => page.reservations) || [];
  const isMyReservationsEmpty = myReservationsData.length === 0;

  useEffect(() => {
    refetch();

    return () => {
      queryClient.removeQueries({ queryKey: ['myReservations'] });
    };
  }, [refetch, queryClient]);

  useEffect(() => {
    if (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error('인증에 실패했습니다. 다시 로그인해주세요.');
        } else {
          toast.error(error.message || '예약 정보를 불러오는 데 실패했습니다.');
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [error, toast]);

  return {
    myReservationsData,
    isMyReservationsEmpty,
    error,
    setTarget,
    handleStatusChange,
    selectedStatus,
  };
};
