import { useState } from 'react';

interface ContainerSize {
  width: number;
  height: number;
}

export const useImageStyles = () => {
  const [imageStyles, setImageStyles] = useState<{ [key: number]: React.CSSProperties }>({});

  const calculateImageStyle = (
    index: number,
    event: React.SyntheticEvent<HTMLImageElement>,
    containerSize: ContainerSize,
  ) => {
    const img = event.target as HTMLImageElement;
    const { naturalWidth, naturalHeight } = img;
    const containerAspectRatio = containerSize.width / containerSize.height;
    const imageAspectRatio = naturalWidth / naturalHeight;

    let width, height, left, top;

    if (imageAspectRatio > containerAspectRatio) {
      height = containerSize.height;
      width = height * imageAspectRatio;
      top = 0;
      left = (containerSize.width - width) / 2;
    } else {
      width = containerSize.width;
      height = width / imageAspectRatio;
      left = 0;
      top = (containerSize.height - height) / 2;
    }

    setImageStyles((prev) => ({
      ...prev,
      [index]: { width, height, left, top, position: 'absolute' as const },
    }));
  };

  return { imageStyles, calculateImageStyle };
};
