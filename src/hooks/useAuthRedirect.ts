import { tokenAtom } from '@/store/tokenAtom';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import useToast from './useToast';

export const useAuthRedirect = (isLoading: boolean) => {
  const router = useRouter();
  const [token] = useAtom(tokenAtom);
  const toast = useToast();
  const prevTokenRef = useRef(token);
  const prevPathRef = useRef(router.pathname);

  useEffect(() => {
    if (isLoading) return;

    const isAuthPage = ['/signin', '/signup'].includes(router.pathname);
    const isProtectedPage = router.pathname.startsWith('/my-page');

    // 페이지 변경 시에만 처리
    if (router.pathname !== prevPathRef.current) {
      if (token && isAuthPage) {
        toast.error('이미 로그인 중입니다.');
        router.replace('/');
      } else if (!token && isProtectedPage) {
        toast.error('로그인이 필요한 서비스입니다.');
        router.replace('/signin');
      }
    }

    prevTokenRef.current = token;
    prevPathRef.current = router.pathname;
  }, [token, router.pathname, isLoading, toast, router]);
};
