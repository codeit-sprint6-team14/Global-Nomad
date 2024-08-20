import { getMyReservations } from '@/apis/myPage/myReservations';
import { MyReservationResponse } from '@/apis/myPage/myReservations.types';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useMyReservationsQuery = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { fetchNextPage, hasNextPage, error, data } = useInfiniteQuery<
    MyReservationResponse,
    Error,
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

  return {
    myReservationsData,
    isMyReservationsEmpty,
    error,
    setTarget,
    handleStatusChange,
    selectedStatus,
  };
};
