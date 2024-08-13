import { postUserSignup } from '@/apis/auth';
import ErrorMessages from '@/constants/errorMessages';
import SuccessMessages from '@/constants/successMessages';
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
        setError(result.message || SuccessMessages.SIGNUP_SUCCESS);
      } else {
        setIsSuccess(false);
        setError(result.message || ErrorMessages.SIGNUP_ERROR);
      }
    },
    onError: (error) => {
      setIsSuccess(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(ErrorMessages.UNKOWN_ERROR);
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
