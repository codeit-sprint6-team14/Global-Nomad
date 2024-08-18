import SocialAuth from '@/apis/socialAuth';
import { getKakaoToken } from '@/utils/getSocialToken';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// 타입 정의 분리
interface AuthData {
  token: string;
  redirectUri: string;
}

interface SignupData extends AuthData {
  nickname: string;
}

const KakaoAuthPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const domain = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  const handleSignup = async (code: string, nickname: string) => {
    const data: SignupData = {
      nickname,
      token: code,
      redirectUri: domain || '',
    };
    try {
      const response = await SocialAuth.postSignup('kakao', data);
      if (response) {
        localStorage.setItem('existUser', 'exist');
        redirectToKakaoAuth();
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        localStorage.setItem('existUser', 'exist');
        redirectToKakaoAuth();
      } else {
        setIsLoading(false);
        setError(error instanceof Error ? error : new Error('회원가입 중 알 수 없는 에러 발생'));
      }
    }
  };

  const handleSignin = async (code: string) => {
    const data: AuthData = {
      token: code,
      redirectUri: domain || '',
    };
    try {
      const response = await SocialAuth.postSignin('kakao', data);
      if (response) {
        router.push('/');
      }
    } catch (error) {
      setError(error instanceof Error ? error : new Error('로그인 중 알 수 없는 에러 발생'));
    } finally {
      setIsLoading(false);
      localStorage.removeItem('existUser');
    }
  };

  const redirectToKakaoAuth = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    router.push(kakaoAuthUrl);
  };

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
          setIsLoading(false);
          setError(new Error('카카오 인증 코드를 받지 못했습니다.'));
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error('카카오 인증 중 알 수 없는 에러 발생'));
      } finally {
        setIsLoading(false);
      }
    };

    handleKakaoRedirect();
  }, []);

  if (isLoading) {
    return <p>처리 중...</p>;
  }
  if (error)
    return (
      <div>
        <p>{error.message}</p>
        <Link href="/signin">로그인 다시 시도하기</Link>
      </div>
    );

  return null;
};

export default KakaoAuthPage;
