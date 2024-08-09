import { atom } from 'jotai';

export type ModalType = 'cancel' | 'review' | null;

export const modalAtom = atom<ModalType>(null);
