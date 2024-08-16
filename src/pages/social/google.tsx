import SocialAuth from '@/apis/socialAuth';
import { getGoogleToken } from '@/utils/getSocialToken';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoadingSpinner = () => <div>회원가입 중...</div>;
const ErrorMessage = ({ message }: { message: string }) => <div>{message}</div>;

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
        const idToken = await getGoogleToken(code); //구글 토큰 받아오기

        const authBody = {
          nickname: '구글 계정',
          redirectUri: GOOGLE_URI || '',
          token: idToken,
        };

        try {
          const data = await SocialAuth.postSignup('google', authBody); //회원가입
          console.log('회원가입 성공', data);
          router.push('/signin');
        } catch (error) {
          if (isAxiosError(error) && error.response?.status === 400) {
            // 존재하는 유저라면(error:400)이면 로그인 시도
            const signinData = await SocialAuth.postSignin('google', authBody);
            console.log('로그인 성공', signinData);
            router.push('/');
          } else {
            throw error;
          }
        }
      } catch (error) {
        console.error('에러 발생: ', error);
        setError(error instanceof Error ? error : new Error('회원가입 중 알 수 없는 에러 발생'));
      } finally {
        setIsLoading(false);
      }
    };

    if (router.isReady) {
      handleAuth();
    }
  }, [router]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return null;
};

export default GoogleAuthPage;
