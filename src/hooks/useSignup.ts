import { postUserSignup } from '@/apis/auth';
import { SignupData } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: SignupData) => postUserSignup(data),
    onSuccess: (result) => {
      if (result.success) {
        setIsSuccess(true);
        setError(result.message || '회원가입 성공!');
      } else {
        setIsSuccess(false);
        setError(result.message || '회원가입 중 오류가 발생했습니다.');
      }
    },
    onError: (error) => {
      setIsSuccess(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    },
  });

  const handleSignup = (data: SignupData) => {
    setError(null);
    setIsSuccess(false);
    mutation.mutate(data);
  };

  const resetError = () => {
    setError(null);
  };

  return {
    handleSignup,
    isLoading: mutation.isPending,
    error,
    resetError,
    isSuccess,
  };
};
