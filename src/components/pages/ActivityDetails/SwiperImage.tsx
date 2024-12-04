import Image from 'next/image';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperComponentProps {
  images: string[];
  containerSize: { width: number; height: number };
  imageStyles: { [key: number]: React.CSSProperties };
  currentIndex: number;
  onSwiper: (swiper: SwiperType) => void;
  onSlideChange: (swiper: SwiperType) => void;
  calculateImageStyle: (index: number, event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const SwiperImage = ({
  images,
  containerSize,
  currentIndex,
  onSwiper,
  onSlideChange,
  calculateImageStyle,
}: SwiperComponentProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={false}
      onSwiper={onSwiper}
      onSlideChange={onSlideChange}
      initialSlide={currentIndex}
      className="h-full w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="relative h-full w-full">
          <Image
            src={image}
            alt={`배너 이미지${index + 1}`}
            fill
            sizes={`${containerSize.width}px`}
            priority={index === currentIndex}
            onLoad={(event) => calculateImageStyle(index, event)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
