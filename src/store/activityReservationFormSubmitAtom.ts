import { atom } from 'jotai';

export type formSubmitDataAtomType = { scheduleId: number; headCount: number };

export const formSubmitDataAtom = atom({ scheduleId: 0, headCount: 0 });
