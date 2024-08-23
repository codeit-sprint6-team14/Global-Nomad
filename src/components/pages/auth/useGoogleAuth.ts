import SocialAuth from '@/apis/socialAuth';
import { tokenAtom } from '@/store/tokenAtom';
import { getGoogleToken } from '@/utils/getSocialToken';
import { isAxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useGoogleAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const setToken = useSetAtom(tokenAtom);

  const handleAuth = useCallback(
    async (code: string) => {
      const GOOGLE_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

      try {
        setIsLoading(true);
        const idToken = await getGoogleToken(code);

        const authBody = {
          nickname: '구글 계정',
          redirectUri: GOOGLE_URI || '',
          token: idToken,
        };

        try {
          await SocialAuth.postSignup('google', authBody);
          setIsSuccess(true);
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 400) {
            await SocialAuth.postSignin('google', authBody);
            setToken(authBody.token);
            setIsSuccess(true);
          } else {
            throw error;
          }
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Google 인증 중 알 수 없는 에러 발생'));
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    if (router.isReady) {
      const { code } = router.query;
      if (code && typeof code === 'string') {
        handleAuth(code);
      }
    }
  }, [router, handleAuth]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { isLoading, error, isSuccess, resetError };
};
