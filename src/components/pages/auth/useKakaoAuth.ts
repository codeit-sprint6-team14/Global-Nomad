import SocialAuth from '@/apis/socialAuth';
import { tokenAtom } from '@/store/tokenAtom';
import { getKakaoToken } from '@/utils/getSocialToken';
import { isAxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { useRandomNickname } from './useRandomNickname';

type KakaoAuthError = Error & { type: 'EXISTING_USER' | 'OTHER_ERROR' };

export const useKakaoAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<KakaoAuthError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const setToken = useSetAtom(tokenAtom);
  const domain = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const { generateNickname } = useRandomNickname();

  const saveTokens = useCallback(
    (accessToken: string, refreshToken: string) => {
      try {
        Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
        setToken(accessToken);
      } catch (e) {
        console.error('토큰 저장 실패:', e);
        setError({ message: '토큰 저장 실패', type: 'OTHER_ERROR' } as KakaoAuthError);
      }
    },
    [setToken],
  );

  const redirectToKakaoAuth = useCallback(() => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    router.push(kakaoAuthUrl);
  }, [router]);

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
          setError({ message: '이미 존재하는 사용자', type: 'EXISTING_USER' } as KakaoAuthError);
          redirectToKakaoAuth();
        } else {
          setError({ message: '회원가입 중 알 수 없는 에러 발생', type: 'OTHER_ERROR' } as KakaoAuthError);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [domain, saveTokens, redirectToKakaoAuth],
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
        if (isAxiosError(error) && error.response?.status === 400) {
          setError({ message: '이미 존재하는 사용자', type: 'EXISTING_USER' } as KakaoAuthError);
        } else {
          setError({ message: 'hihi', type: 'OTHER_ERROR' } as KakaoAuthError);
        }
      } finally {
        setIsLoading(false);
        localStorage.removeItem('existUser');
      }
    },
    [domain, saveTokens],
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    const handleKakaoRedirect = async () => {
      try {
        const code = await getKakaoToken();
        const nickname = generateNickname();
        const existUser = localStorage.getItem('existUser') === 'exist';

        if (code) {
          if (!existUser) {
            await handleSignup(code, nickname);
          } else {
            await handleSignin(code);
          }
        } else {
          setError({ message: '카카오 인증 코드를 받지 못했습니다.', type: 'OTHER_ERROR' } as KakaoAuthError);
        }
      } catch (error) {
        setError({ message: '카카오 인증 중 알 수 없는 에러 발생', type: 'OTHER_ERROR' } as KakaoAuthError);
      } finally {
        setIsLoading(false);
      }
    };

    handleKakaoRedirect();
  }, [handleSignin, handleSignup]);

  return { isLoading, error, isSuccess, resetError, redirectToKakaoAuth };
};
