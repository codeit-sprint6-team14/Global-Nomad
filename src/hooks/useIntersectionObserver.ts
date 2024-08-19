import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface useIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
  threshold = 0.5,
  hasNextPage,
  fetchNextPage,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      {
        threshold,
      },
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [hasNextPage, fetchNextPage, threshold, target]);

  return { setTarget };
};
