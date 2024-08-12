import Icon from '@/components/common/Icons';
import Image from 'next/image';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

const MAX_IMAGES = 4;

interface ImageUploadSecionProps {
  title: string;
  multiple?: boolean;
}

interface ImageFile {
  file: File;
  preview: string;
}

const ImageUploadSection = ({ title, multiple = false }: ImageUploadSecionProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createImageObjects = (files: FileList) => {
    return Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  };

  const addMultipleImages = (newImages: ImageFile[]) => {
    setImages((prevImages) => {
      const availableSlots = MAX_IMAGES - prevImages.length;
      const imagesToAdd = newImages.slice(0, availableSlots);

      return [...prevImages, ...imagesToAdd];
    });
  };

  const addSingleImage = (newImages: ImageFile[]) => {
    setImages([newImages[0]]);
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newImages = createImageObjects(e.target.files);

    if (multiple) {
      addMultipleImages(newImages);
    } else {
      addSingleImage(newImages);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleClickInput = (e: MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <div>
      <h3 className="text-xl-bold md:text-2xl-bold">{title}</h3>
      <p className="mb-24 text-red-500">*최소 1개의 이미지를 등록해주세요</p>
      <div className="grid grid-cols-2 gap-16 lg:grid-cols-4 lg:gap-24">
        <button
          type="button"
          className="relative h-167 w-167 md:h-206 md:w-206 lg:h-180 lg:w-180"
          onClick={handleClickInput}
        >
          <Icon.Rectangle className="h-full w-full md:h-206 md:w-206 lg:h-180 lg:w-180" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Icon.Plus width="80" height="80" fill="#4B4B4B" />
            <span className="mt-4 text-2xl-regular text-gray-800">이미지 등록</span>
          </div>
        </button>
        {images?.map((image, index) => (
          <div key={index} className="relative">
            <div className="relative h-167 w-167 overflow-hidden rounded-24 md:h-206 md:w-206 lg:h-180 lg:w-180">
              <Image src={image.preview} alt={`Preview ${index}`} fill placeholder="blur" blurDataURL={image.preview} />
            </div>
            <button
              className="bg-#1B1B1BCC absolute -right-10 -top-8 rounded-full"
              onClick={() => handleDeleteImage(index)}
            >
              <Icon.DeleteButton width="24" height="24" />
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple={multiple}
        onChange={handleUploadImage}
      />
    </div>
  );
};

export default ImageUploadSection;
