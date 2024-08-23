import BasicThumbnail1 from '@/../public/assets/images/testImg/air-balloon.png';
import BasicThumbnail2 from '@/../public/assets/images/testImg/dance.png';
import BasicThumbnail3 from '@/../public/assets/images/testImg/dog.png';
import BasicThumbnail4 from '@/../public/assets/images/testImg/fish.png';
import BasicThumbnail5 from '@/../public/assets/images/testImg/village.png';
import { StaticImageData } from 'next/image';
import { useMemo, useState } from 'react';

const backupThumnails: StaticImageData[] = [
  BasicThumbnail1,
  BasicThumbnail2,
  BasicThumbnail3,
  BasicThumbnail4,
  BasicThumbnail5,
];

export const useBackupImage = (originalImageUrl: string | undefined) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const backupImage = useMemo(() => {
    return backupThumnails[Math.floor(Math.random() * backupThumnails.length)];
  }, []);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const imageSource = originalImageUrl && !imageLoadError ? originalImageUrl : backupImage.src;
  const altText = imageLoadError ? 'Backup Thumbnail' : 'Activity Thumbnail';

  return { imageSource, altText, handleImageError };
};
