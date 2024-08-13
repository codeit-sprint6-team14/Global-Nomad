import { postUserSignin } from '@/apis/auth';
import { userAtom } from '@/store/userAtom';
import { SigninData } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSignin = () => {
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (credentials: SigninData) => postUserSignin(credentials),
    onSuccess: (result) => {
      if (result.success) {
        setUser({ accessToken: result.data.accessToken, refreshToken: result.data.refreshToken });

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);

        router.push('/');
      } else {
        setError(result.error || '로그인 중 오류가 발생했습니다.');
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
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
