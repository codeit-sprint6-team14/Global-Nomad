import { atom } from 'jotai';

export const userAtom = atom({
  email: '',
  nickname: '',
  profileImage: '',
});

export const passwordAtom = atom<string>('');
export const confirmPasswordAtom = atom<string>('');
export const isChangedAtom = atom<boolean>(false);
