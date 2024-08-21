import { postUserSignin } from '@/apis/auth';
import ErrorMessages from '@/constants/errorMessages';
import { tokenAtom } from '@/store/tokenAtom';
import { SigninData, SigninResult } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSignin = () => {
  const router = useRouter();
  const setToken = useSetAtom(tokenAtom);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation<SigninResult, Error, SigninData>({
    mutationFn: postUserSignin,
    onSuccess: (result) => {
      if ('user' in result) {
        setToken({ accessToken: result.accessToken, refreshToken: result.refreshToken });

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);

        router.push('/');
      } else {
        setError(result.error);
      }
    },
    onError: (error) => {
      setError(error.message || ErrorMessages.SIGNIN_ERROR);
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
