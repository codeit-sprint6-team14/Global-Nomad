import { postUserSignin } from '@/apis/auth';
import ErrorMessages from '@/constants/errorMessages';
import { tokenAtom } from '@/store/tokenAtom';
import { SigninData } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSignin = () => {
  const router = useRouter();
  const setToken = useSetAtom(tokenAtom);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (credentials: SigninData) => postUserSignin(credentials),
    onSuccess: (result) => {
      if (result.success) {
        setToken({ accessToken: result.data.accessToken, refreshToken: result.data.refreshToken });

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);

        router.push('/');
      } else {
        setError(result.error || ErrorMessages.SIGNIN_ERROR);
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(ErrorMessages.UNKOWN_ERROR);
      }
    },
  });

  const handleSignin = (credentials: SigninData) => {
    setError(null);
    mutation.mutate(credentials);
  };

  const resetError = () => {
    setError(null);
  };

  return {
    handleSignin,
    isLoading: mutation.isPending,
    error,
    resetError,
  };
};
