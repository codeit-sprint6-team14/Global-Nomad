import { signUp } from '@/apis/auth';
import { SignupData } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useSignup = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: SignupData) => signUp(data),
    onSuccess: (result) => {
      if (result.success) {
        router.push('/signin');
      } else {
        setError(result.message || '회원가입 중 오류가 발생했습니다.');
      }
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  const handleSignup = (data: SignupData) => {
    setError(null);
    mutation.mutate(data);
  };

  return {
    handleSignup,
    isLoading: mutation.isPending,
    error,
  };
};
