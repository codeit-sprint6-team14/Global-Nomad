import NextButton from '@/../public/assets/icons/next-image-button.svg';
import PrevButton from '@/../public/assets/icons/prev-image-button.svg';

interface ImageModalControlsProps {
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
}

export const ImageModalControls = ({ onClose, onPrev, onNext, currentIndex, totalImages }: ImageModalControlsProps) => {
  return (
    <>
      <div className="absolute left-[50%] top-[5vh] z-20 -translate-x-1/2 text-lg-medium text-white">
        {currentIndex + 1} / {totalImages}
      </div>
      <button
        onClick={onClose}
        className="absolute right-[5%] top-[4vh] z-20 flex items-center justify-center gap-8 rounded-10 px-20 pb-6 pt-8 text-lg-medium text-white hover:bg-gray-800"
      >
        <p className="text-2lg-regular">✕</p>
        <p className="text-lg-regular">닫기</p>
      </button>
      <button
        onClick={onPrev}
        className="absolute left-auto top-[77vh] z-20 mr-40 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-white text-xl font-bold text-white hover:bg-gray-800 hover:bg-opacity-100 md:left-[2vw] md:top-[50%] md:h-50 md:w-50"
      >
        <PrevButton alt="이전 화살표" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-auto top-[77vh] z-20 ml-40 flex h-30 w-30 cursor-pointer items-center justify-center rounded-full border-2 border-solid border-white text-xl font-bold text-white hover:bg-gray-800 hover:bg-opacity-100 md:right-[2vw] md:top-[50%] md:h-50 md:w-50"
      >
        <NextButton alt="다음 화살표" />
      </button>
    </>
  );
};
