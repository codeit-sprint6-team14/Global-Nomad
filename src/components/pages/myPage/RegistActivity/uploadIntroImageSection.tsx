/* eslint-disable react-hooks/exhaustive-deps */
import Icon from '@/components/common/Icons';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { useUploadIntroImageMutation } from './hooks/useUploadIntroImageMutation';
import { BaseImage, LocalImage, UploadIntroImageSectionProps } from './types/uploadImageSection.types';

const MAX_IMAGES = 4;

const UploadIntroImageSection = ({ onChange, error, initialImages }: UploadIntroImageSectionProps) => {
  const [serverImages, setServerImages] = useState<BaseImage[]>([]);
  const [localImages, setLocalImages] = useState<LocalImage[]>([]);
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [subImageUrlsToAdd, setSubImageUrlsToAdd] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateImageData = () => {
    const currentImages = [...serverImages.map((img) => img.imageUrl), ...subImageUrlsToAdd];
    onChange({
      currentImages,
      subImageIdsToRemove,
      subImageUrlsToAdd,
    });
  };

  const onSuccess = (data: { activityImageUrl: string }[]) => {
    const newImageUrls = data.map((response) => response.activityImageUrl);

    setSubImageUrlsToAdd((prev) => [...prev, ...newImageUrls]);
    updateImageData();
  };

  const { error: uploadImageError, mutate: uploadImage } = useUploadIntroImageMutation(onSuccess);

  const handleClickInput = (e: MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const availableSlots = MAX_IMAGES - (serverImages.length + localImages.length);
      const filesToUpload = Array.from(files).slice(0, availableSlots);
      const newLocalImages = filesToUpload.map((file) => ({
        blobUrl: URL.createObjectURL(file),
        file,
      }));
      setLocalImages((prev) => [...prev, ...newLocalImages]);
      uploadImage(filesToUpload);
    }
  };

  const handleDeleteImage = (e: MouseEvent, index: number) => {
    e.stopPropagation();

    if (index < serverImages.length) {
      const imageToDelete = serverImages[index];
      setSubImageIdsToRemove((prev) => [...prev, imageToDelete.id]);
      setServerImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const localIndex = index - serverImages.length;
      setLocalImages((prev) => prev.filter((_, i) => i !== localIndex));
    }

    updateImageData();
  };

  const allImages = [...serverImages, ...localImages];

  useEffect(() => {
    setServerImages(initialImages);
    setSubImageIdsToRemove([]);
    setSubImageUrlsToAdd([]);
  }, [initialImages]);

  useEffect(() => {
    updateImageData();
  }, [serverImages, subImageIdsToRemove, subImageUrlsToAdd]);

  useEffect(() => {
    return () => {
      localImages.forEach((img) => URL.revokeObjectURL(img.blobUrl));
    };
  }, []);

  return (
    <>
      {uploadImageError && <div className="mb-4 text-red-500">{uploadImageError.message}</div>}
      <h3 className="mb-24 text-xl-bold md:text-2xl-bold">소개 이미지</h3>
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
        {allImages.map(
          (image, index) =>
            image && (
              <div key={index} className="relative">
                <div className="relative h-167 w-167 overflow-hidden rounded-24 md:h-206 md:w-206 lg:h-180 lg:w-180">
                  <Image
                    src={'imageUrl' in image ? image.imageUrl : image.blobUrl}
                    alt="이미지 미리보기"
                    fill
                    placeholder="blur"
                    blurDataURL={'imageUrl' in image ? image.imageUrl : image.blobUrl}
                  />
                </div>
                <button
                  type="button"
                  className="absolute -right-10 -top-8 rounded-full bg-[#1B1B1BCC]"
                  onClick={(e) => handleDeleteImage(e, index)}
                >
                  <Icon.DeleteButton width="24" height="24" />
                </button>
              </div>
            ),
        )}
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUploadImage} />
    </>
  );
};

export default UploadIntroImageSection;
