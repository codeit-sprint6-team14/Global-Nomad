import { getReservationList } from '@/apis/myPage/myReservations';
import { ReservationResponse } from '@/apis/myPage/myReservations.types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useToast from '@/hooks/useToast';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useListQuery = () => {
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const toast = useToast();

  const { fetchNextPage, hasNextPage, error, data, refetch } = useInfiniteQuery<
    ReservationResponse,
    AxiosError,
    InfiniteData<ReservationResponse>,
    ['reservationList', string | null],
    number | null
  >({
    queryKey: ['reservationList', selectedOption],
    queryFn: ({ pageParam = null }) => getReservationList({ pageParam, status: selectedOption }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  const { divRef } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const handleStatusChange = (newStatus: string | null) => {
    setSelectedOption(newStatus);
  };

  const list = data?.pages.flatMap((page) => page.reservations) || [];
  const isListEmpty = list.length === 0;

  useEffect(() => {
    refetch();

    return () => {
      queryClient.removeQueries({ queryKey: ['reservationList'] });
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
    list,
    isListEmpty,
    error,
    divRef,
    handleStatusChange,
    selectedOption,
  };
};
