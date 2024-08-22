import SocialAuth from '@/apis/socialAuth';
import { tokenAtom } from '@/store/tokenAtom';
import { getKakaoToken } from '@/utils/getSocialToken';
import { isAxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export const useKakaoAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const setToken = useSetAtom(tokenAtom);
  const domain = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const saveTokens = useCallback(
    (accessToken: string, refreshToken: string) => {
      try {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setToken(accessToken);
      } catch (e) {
        console.error('Failed to save tokens to localStorage:', e);
        setError(new Error('Failed to save authentication tokens'));
      }
    },
    [setToken],
  );

  const handleSignup = useCallback(
    async (code: string, nickname: string) => {
      const data = { nickname, token: code, redirectUri: domain || '' };
      try {
        const response = await SocialAuth.postSignup('kakao', data);
        if (response) {
          saveTokens(response.accessToken, response.refreshToken);
          localStorage.setItem('existUser', 'exist');
          setIsSuccess(true);
        }
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) {
          localStorage.setItem('existUser', 'exist');
          redirectToKakaoAuth();
        } else {
          setError(error instanceof Error ? error : new Error('회원가입 중 알 수 없는 에러 발생'));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [domain, saveTokens],
  );

  const handleSignin = useCallback(
    async (code: string) => {
      const data = { token: code, redirectUri: domain || '' };
      try {
        const response = await SocialAuth.postSignin('kakao', data);
        if (response) {
          saveTokens(response.accessToken, response.refreshToken);
          setIsSuccess(true);
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error('로그인 중 알 수 없는 에러 발생'));
      } finally {
        setIsLoading(false);
        localStorage.removeItem('existUser');
      }
    },
    [domain, saveTokens],
  );

  const redirectToKakaoAuth = useCallback(() => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    router.push(kakaoAuthUrl);
  }, [router]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    const handleKakaoRedirect = async () => {
      try {
        const code = await getKakaoToken();
        const nickname = '카카오 계정';
        const existUser = localStorage.getItem('existUser') === 'exist';

        if (code) {
          if (!existUser) {
            await handleSignup(code, nickname);
          } else {
            await handleSignin(code);
          }
        } else {
          setError(new Error('카카오 인증 코드를 받지 못했습니다.'));
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error('카카오 인증 중 알 수 없는 에러 발생'));
      } finally {
        setIsLoading(false);
      }
    };

    handleKakaoRedirect();
  }, [handleSignin, handleSignup]);

  return { isLoading, error, isSuccess, resetError };
};
