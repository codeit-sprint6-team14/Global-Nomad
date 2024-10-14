import { axiosRequester } from '@/libs/axios';

import { ReservationResponse } from './myReservations.types';

export const getReservationList = async ({
  pageParam = null,
  status,
}: {
  pageParam: number | null;
  status?: string | null;
}) => {
  const params: { size: number; cursorId?: number | null; status?: string } = {
    size: 5,
    cursorId: pageParam,
  };

  if (status !== null) {
    params.status = status;
  }

  const { data } = await axiosRequester<ReservationResponse>({
    options: {
      method: 'GET',
      url: 'my-reservations',
      params,
    },
    includeAuth: true,
  });

  return data;
};

export const patchReservation = async (reservationId: number) => {
  const { data } = await axiosRequester({
    options: {
      method: 'PATCH',
      url: `my-reservations/${reservationId}`,
      data: {
        status: 'canceled',
      },
    },
    includeAuth: true,
  });

  return data;
};

interface ReviewData {
  rating: number;
  content: string;
}

export const postReview = async (reservationId: number | null, reviewData: ReviewData) => {
  const { data } = await axiosRequester({
    options: {
      method: 'POST',
      url: `my-reservations/${reservationId}/reviews`,
      data: reviewData,
    },
    includeAuth: true,
  });
  return data;
};
