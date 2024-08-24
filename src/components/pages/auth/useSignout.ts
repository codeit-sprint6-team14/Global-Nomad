import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const useSignout = () => {
  const router = useRouter();

  const signout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    localStorage.removeItem('social');
    router.push('/');
  };

  return signout;
};
