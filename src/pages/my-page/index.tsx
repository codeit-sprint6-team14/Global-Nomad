import SideNavMenu from '@/components/common/SideNavMenu';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Mypage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        if (router.pathname === '/my-page') {
          router.replace('/my-page/profile');
        }
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router]);

  return (
    <div className="flex w-full justify-center bg-gray-100">
      <div className="mb-60 mt-30">
        <SideNavMenu />
      </div>
    </div>
  );
};

export default Mypage;
