import { ReactNode, useEffect, useRef } from 'react';

import { useSwiperContext } from './SwiperContext';

type SwiperTriggerProps = {
  children: ReactNode;
  className?: string;
};

const SwiperTrigger: React.FC<SwiperTriggerProps> = ({ children, className = '' }) => {
  const { currentIndex, setCurrentIndex } = useSwiperContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: currentIndex * containerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children}
      </div>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2"
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
      >
        {'<'}
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2"
        onClick={() => setCurrentIndex(Math.min(React.Children.count(children) - 1, currentIndex + 1))}
      ></button>
    </div>
  );
};
export default SwiperTrigger;
