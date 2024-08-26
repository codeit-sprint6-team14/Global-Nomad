import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useToast from './useToast';

const useRedirectMessage = () => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const message = router.query.message as string;
    if (message) {
      switch (message) {
        case 'already_logged_in':
          toast.error('이미 로그인 중입니다.');
          break;
        case 'login_required':
          toast.error('로그인이 필요한 서비스입니다.');
          break;
      }

      // 메시지를 표시한 후 URL에서 제거
      const { pathname, query } = router;
      delete query.message;
      router.replace({ pathname, query }, undefined, { shallow: true });
    }
  }, [router, toast]);
};

export default useRedirectMessage;
