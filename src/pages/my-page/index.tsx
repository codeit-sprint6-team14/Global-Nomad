import SideNavMenu from '@/components/common/SideNavMenu';
import useViewportSize from '@/hooks/useViewportSize';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Mypage: React.FC = () => {
  const router = useRouter();
  const viewportSize = useViewportSize(); // 현재 화면 크기를 가져옴

  const redirectPath = viewportSize !== 'mobile' && router.pathname === '/my-page';

  useEffect(() => {
    if (redirectPath) {
      router.replace('/my-page/profile');
    }
  }, [redirectPath, router]);

  if (redirectPath) {
    return null;
  }

  return (
    <div className="flex w-full justify-center">
      <div className="mb-60 mt-30">
        <SideNavMenu />
      </div>
    </div>
  );
};

export default Mypage;
