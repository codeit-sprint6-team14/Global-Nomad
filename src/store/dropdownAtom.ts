import { atom } from 'jotai';

export type dropDownType = 'category' | 'time' | null;

export const dropdownTypeAtom = atom<dropDownType>(null);
