import { TokensResponse } from '@/types/auth';
import { atom } from 'jotai';

export const tokenAtom = atom<TokensResponse | null>(null);
