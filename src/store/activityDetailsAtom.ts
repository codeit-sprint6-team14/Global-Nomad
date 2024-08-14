import { TimeSlot } from '@/types/availableSchedulesTypes';
import { atom } from 'jotai';

export type formSubmitDataAtomType = { activityId: string; scheduleId: number; headCount: number };

export const scheduleIdAtom = atom(0);

export const headCountAtom = atom(0);

export const activityIdAtom = atom('');

export const ReservationPriceAtom = atom(0);

export const selectedDateAtom = atom<Date | null>(null);

export const selectedSlotAtom = atom<TimeSlot | null>(null);

export const selectedScheduleStateAtom = atom(false);

export const isModalOpenAtom = atom(false);
