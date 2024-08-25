import { postUserSignin } from '@/apis/auth';
import ErrorMessages from '@/constants/errorMessages';
import { tokenAtom } from '@/store/tokenAtom';
import { SigninData, SigninResult } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import Cookies from 'js-cookie';
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
        setToken(result.accessToken);

        //토큰 쿠키에 저장
        Cookies.set('accessToken', result.accessToken, { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('refreshToken', result.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });

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
