import { useRouter } from 'next/router';

export const useSignout = () => {
  const router = useRouter();

  const signout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('social');
    router.push('/');
  };

  return signout;
};
