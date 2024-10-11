import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

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
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = divRef.current;

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
  }, [hasNextPage, fetchNextPage, threshold]);

  return { divRef };
};
