import SocialAuth from '@/apis/socialAuth';
import { getGoogleToken } from '@/utils/getSocialToken';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const GoogleAuthPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      const { code } = router.query;
      const GOOGLE_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

      if (!code || typeof code !== 'string') return;

      try {
        setIsLoading(true);
        const idToken = await getGoogleToken(code); // 구글 토큰 받아오기

        const authBody = {
          nickname: '구글 계정',
          redirectUri: GOOGLE_URI || '',
          token: idToken,
        };

        try {
          await SocialAuth.postSignup('google', authBody); // 회원가입
          router.push('/signin');
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 400) {
            // 존재하는 유저라면(error:400)이면 로그인 시도
            await SocialAuth.postSignin('google', authBody);
            router.push('/');
          } else {
            throw error;
          }
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error('회원가입 중 알 수 없는 에러 발생'));
      } finally {
        setIsLoading(false);
      }
    };

    if (router.isReady) {
      handleAuth();
    }
  }, [router]);

  if (isLoading) return <div>처리 중...</div>;
  if (error) return <div>{error.message}</div>;

  return null;
};

export default GoogleAuthPage;
