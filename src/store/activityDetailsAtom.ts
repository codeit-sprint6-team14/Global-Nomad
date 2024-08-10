import { atom } from 'jotai';

export type formSubmitDataAtomType = { scheduleId: number; headCount: number };

export const formSubmitDataAtom = atom({ scheduleId: 0, headCount: 0 });

export const activityIdAtom = atom('');

const INITIAL_DATE = new Date();

const year = INITIAL_DATE.getFullYear();
const twoDigitMonth = String(INITIAL_DATE.getMonth() + 1).padStart(2, '0');

export const yearAtom = atom(year);
export const monthAtom = atom(twoDigitMonth);
