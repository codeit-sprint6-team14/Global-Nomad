import NextButton from '@/../public/assets/icons/next-image-button.svg';
import PrevButton from '@/../public/assets/icons/prev-image-button.svg';
import useViewportSize from '@/hooks/useViewportSize';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

interface BannerImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const BannerImageModal = ({ images, currentIndex, onClose, onPrev, onNext }: BannerImageModalProps) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [direction, setDirection] = useState(0);
  const viewportSize = useViewportSize();
  const isMobile = viewportSize === 'mobile';

  const updateImageSize = useCallback(() => {
    if (isMobile) {
      setImageSize({ width: window.innerWidth, height: window.innerHeight });
    } else {
      const aspectRatio = 16 / 9;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;

      let width = maxWidth;
      let height = width / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setImageSize({ width, height });
    }
  }, [isMobile]);

  useEffect(() => {
    updateImageSize();
    window.addEventListener('resize', updateImageSize);
    return () => window.removeEventListener('resize', updateImageSize);
  }, [updateImageSize]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <div className="absolute left-[50%] top-[10%] z-20 text-lg-medium text-white">
          {currentIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="absolute right-[5%] top-[5%] z-20 flex items-center justify-center gap-8 rounded-10 px-20 pb-6 pt-8 text-lg-medium text-white hover:bg-gray-800"
        >
          <p className="text-2lg-regular">✕</p>
          <p className="text-lg-regular">닫기</p>
        </button>
        <div
          className="relative overflow-hidden"
          style={{ width: `${imageSize.width}px`, height: `${imageSize.height}px` }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              className="h-full w-full object-contain"
              key={currentIndex}
              src={images[currentIndex]}
              custom={direction}
              variants={isMobile ? variants : undefined}
              initial={isMobile ? 'enter' : false}
              animate={isMobile ? 'center' : { opacity: 1 }}
              exit={isMobile ? 'exit' : { opacity: 0 }}
              transition={{ duration: 0.15 }}
              alt={`Banner image ${currentIndex + 1}`}
            />
          </AnimatePresence>
        </div>
        {!isMobile && (
          <>
            <button
              onClick={() => {
                setDirection(-1);
                onPrev();
              }}
              className="absolute left-24 top-[50%] z-20 flex h-50 w-50 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-white text-xl font-bold text-white hover:bg-gray-800 hover:bg-opacity-100"
            >
              <PrevButton alt="이전 화살표" />
            </button>
            <button
              onClick={() => {
                setDirection(1);
                onNext();
              }}
              className="absolute right-24 top-[50%] z-20 flex h-50 w-50 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-white text-xl font-bold text-white hover:bg-gray-800 hover:bg-opacity-100"
            >
              <NextButton alt="다음 화살표" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BannerImageModal;
