import { ReactNode } from 'react';

type SwiperSlideProps = {
  children: ReactNode;
  className?: string;
};

const SwiperSlide: React.FC<SwiperSlideProps> = ({ children, className = '' }) => {
  return <div className={`w-full flex-shrink-0 ${className}`}>{children}</div>;
};

export default SwiperSlide;
