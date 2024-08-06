import { useEffect, useState } from 'react';

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

const useViewportSize = (): ViewportSize => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>('mobile');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setViewportSize('desktop');
      } else if (window.innerWidth >= 744) {
        setViewportSize('tablet');
      } else {
        setViewportSize('mobile');
      }
    };

    // 초기 실행
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewportSize;
};

export default useViewportSize;
