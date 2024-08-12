import { TokensResponse } from '@/types/auth';
import { atom } from 'jotai';

export const userAtom = atom<TokensResponse | null>(null);
