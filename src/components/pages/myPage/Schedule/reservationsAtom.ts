import { atom } from 'jotai';

type ReservationData = {
  id: number;
  activityId: number;
  name: string;
  count: number;
};
export const reservationsAtom = atom<{
  신청: ReservationData[];
  승인: ReservationData[];
  거절: ReservationData[];
}>({
  신청: [],
  승인: [],
  거절: [],
});
