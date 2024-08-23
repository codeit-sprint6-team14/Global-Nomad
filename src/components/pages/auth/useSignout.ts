import { useRouter } from 'next/router';

export const useSignout = () => {
  const router = useRouter();

  const signout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/');
  };

  return signout;
};
