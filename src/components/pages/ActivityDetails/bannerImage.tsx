import useViewportSize from '@/hooks/useViewportSize';
import { SubImage } from '@/types/activity';
import Image from 'next/image';
import { useState } from 'react';

import BannerImageModal from './bannerImageModal';

const BannerImage = ({ bannerImageUrl, subImages }: { bannerImageUrl: string; subImages: SubImage[] }) => {
  const viewportSize = useViewportSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [bannerImageUrl, ...subImages.map((img) => img.imageUrl)];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? allImages.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === allImages.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-5 md:px-24 md:pb-32 md:pt-16 lg:px-0 lg:pb-45 lg:pt-24">
        {bannerImageUrl && (
          <div
            className="group relative w-full cursor-pointer pb-[100%] md:h-auto md:w-[50%] md:overflow-hidden md:rounded-l-7 md:pb-[33.33%] lg:pb-[44.5%]"
            onClick={() => openModal(0)}
          >
            <Image
              src={bannerImageUrl}
              fill
              style={{ objectFit: 'cover' }}
              alt="배너이미지"
              sizes="(min-width: 375px) 375px, (min-width: 744px) 744px, (min-width: 1200px) 1200px"
              priority
              unoptimized
              className="duration-10 transition-all"
            />
            <div className="duration-10 absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20"></div>
          </div>
        )}
        {(viewportSize === 'tablet' || viewportSize === 'desktop') && subImages.length > 0 && (
          <div className="grid w-full grid-cols-2 grid-rows-2 gap-5 overflow-hidden rounded-r-7 md:w-[50%] lg:gap-8">
            {subImages.slice(0, 4).map((subImage, index) => (
              <div
                key={subImage.id}
                className="group relative cursor-pointer pb-[100%]"
                onClick={() => openModal(index + 1)}
              >
                <Image
                  src={subImage.imageUrl}
                  fill
                  style={{ objectFit: 'cover' }}
                  alt={`서브 이미지 ${subImage.id}`}
                  sizes="(min-width: 744px) 172px, (min-width: 1200px) 263px"
                  priority
                  unoptimized
                  className="duration-10 transition-all"
                />
                <div className="duration-10 absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-20"></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div id="title" className="h-40" />
      {isModalOpen && (
        <BannerImageModal
          images={allImages}
          currentIndex={currentImageIndex}
          onClose={closeModal}
          onPrev={goToPrevImage}
          onNext={goToNextImage}
        />
      )}
    </>
  );
};

export default BannerImage;
