import { axiosRequester } from '@/libs/axios';

import { MyReservationResponse } from './myReservations.types';

export const getMyReservations = async ({
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

  const { data } = await axiosRequester<MyReservationResponse>({
    options: {
      method: 'GET',
      url: 'my-reservations',
      params,
    },
    includeAuth: true,
  });

  return data;
};

export const patchMyReservation = async (reservationId: number) => {
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
