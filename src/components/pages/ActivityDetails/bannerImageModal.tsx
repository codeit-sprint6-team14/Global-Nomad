import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';

import { ImageModalControls } from './ImageModalControls';
import { SwiperImage } from './SwiperImage';
import { useContainerSize } from './useContainerSize';
import { useImageStyles } from './useImageStyles';

interface BannerImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const BannerImageModal = ({ images, currentIndex, onClose, onPrev, onNext }: BannerImageModalProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const containerSize = useContainerSize();
  const { imageStyles, calculateImageStyle } = useImageStyles();

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <ImageModalControls
          onClose={onClose}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={currentIndex}
          totalImages={images.length}
        />
        <div
          className="relative overflow-hidden"
          style={{
            width: `${containerSize.width}px`,
            height: `${containerSize.height}px`,
          }}
        >
          <SwiperImage
            images={images}
            containerSize={containerSize}
            imageStyles={imageStyles}
            currentIndex={currentIndex}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              const newIndex = swiper.activeIndex;
              if (newIndex !== currentIndex) {
                if (newIndex > currentIndex) {
                  onNext();
                } else {
                  onPrev();
                }
              }
            }}
            calculateImageStyle={(index, event) => calculateImageStyle(index, event, containerSize)}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerImageModal;
