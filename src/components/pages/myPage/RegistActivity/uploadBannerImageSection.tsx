import Icon from '@/components/common/Icons';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { useUploadBannerImageMutation } from './hooks/useUploadBannerImageMutation';
import { UploadBannerImageSectionProps } from './types/uploadImageSection.types';

const UploadBannerImageSection = ({ onChange, initialImage, error }: UploadBannerImageSectionProps) => {
  const [currentImage, setCurrentImage] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onUploadSuccess = (data: { activityImageUrl: string }) => {
    onChange(data.activityImageUrl);
  };

  const { error: ImageMutationError, mutate: mutateImage } = useUploadBannerImageMutation(onUploadSuccess);

  const handleClickInput = (e: MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const localUrl = URL.createObjectURL(file);
      setCurrentImage(localUrl);
      mutateImage(file);
    }
  };

  const handleDeleteImage = () => {
    setCurrentImage('');
    onChange('');
  };

  useEffect(() => {
    setCurrentImage(initialImage);
  }, [initialImage]);

  useEffect(() => {
    return () => {
      if (currentImage) {
        URL.revokeObjectURL(currentImage);
      }
    };
  }, [currentImage]);

  return (
    <>
      {ImageMutationError && <div className="mb-4 text-red-500">{ImageMutationError.message}</div>}
      <h3 className="mb-24 text-xl-bold md:text-2xl-bold">배너 이미지</h3>
      <div className="grid grid-cols-2 gap-16 lg:grid-cols-4 lg:gap-24">
        <button
          type="button"
          className="relative h-167 w-167 md:h-206 md:w-206 lg:h-180 lg:w-180"
          onClick={handleClickInput}
        >
          <Icon.Rectangle error={error} className="h-full w-full md:h-206 md:w-206 lg:h-180 lg:w-180" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Icon.Plus width="80" height="80" fill="#4B4B4B" />
            <span className="mt-4 text-2xl-regular text-gray-800">이미지 등록</span>
          </div>
        </button>
        {currentImage && (
          <div className="relative">
            <div className="relative h-167 w-167 overflow-hidden rounded-24 md:h-206 md:w-206 lg:h-180 lg:w-180">
              <Image src={currentImage} alt="이미지 미리보기" fill placeholder="blur" blurDataURL={currentImage} />
            </div>
            <button className="absolute -right-10 -top-8 rounded-full bg-[#1B1B1BCC]" onClick={handleDeleteImage}>
              <Icon.DeleteButton width="24" height="24" />
            </button>
          </div>
        )}
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUploadImage} />
    </>
  );
};

export default UploadBannerImageSection;
