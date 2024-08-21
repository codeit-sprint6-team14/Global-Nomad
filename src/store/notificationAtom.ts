import { NotificationType } from '@/apis/notification.type';
import { atom } from 'jotai';

export const alarmsAtom = atom<NotificationType[]>([]);
export const totalCountAtom = atom<number>(0);
