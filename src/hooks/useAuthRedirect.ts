import { tokenAtom } from '@/store/tokenAtom';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useToast from './useToast';

export const useAuthRedirect = () => {
  const router = useRouter();
  const [token] = useAtom(tokenAtom);
  const toast = useToast();

  useEffect(() => {
    const isAuthPage = ['/signin', '/signup'].includes(router.pathname);
    const isProtectedPage = router.pathname.startsWith('/my-page');

    if (token && isAuthPage) {
      toast.error('이미 로그인 중 입니다.');
      router.replace('/');
    } else if (!token && isProtectedPage) {
      toast.error('해당 페이지는 로그인이 필요한 서비스입니다.');
      router.replace('/signin');
    }
  }, [token, router.pathname]);
};
