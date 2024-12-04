import useViewportSize from '@/hooks/useViewportSize';
import { useCallback, useEffect, useState } from 'react';

export const useContainerSize = () => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const viewportSize = useViewportSize();
  const isMobile = viewportSize === 'mobile';

  const updateContainerSize = useCallback(() => {
    if (isMobile) {
      setContainerSize({ width: window.innerWidth, height: window.innerHeight * 0.5 });
    } else {
      const aspectRatio = 4 / 3;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;

      let width = maxWidth;
      let height = width / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setContainerSize({ width, height });
    }
  }, [isMobile]);

  useEffect(() => {
    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [updateContainerSize]);

  return containerSize;
};
