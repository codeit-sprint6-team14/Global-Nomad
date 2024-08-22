import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import Star from '../../../../public/assets/icons/star.svg';
import BasicThumbnail1 from '../../../../public/assets/images/testImg/air-balloon.png';
import BasicThumbnail2 from '../../../../public/assets/images/testImg/dance.png';
import BasicThumbnail3 from '../../../../public/assets/images/testImg/dog.png';
import BasicThumbnail4 from '../../../../public/assets/images/testImg/fish.png';
import BasicThumbnail5 from '../../../../public/assets/images/testImg/village.png';
import { ActivityCardProps } from './mainPage.type';

const backupThumbnails = [BasicThumbnail1, BasicThumbnail2, BasicThumbnail3, BasicThumbnail4, BasicThumbnail5];

const ActivityCards: React.FC<ActivityCardProps> = ({ activity }) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const randomBackupThumbnail = useMemo(() => {
    return backupThumbnails[Math.floor(Math.random() * backupThumbnails.length)];
  }, []);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <Link
      href={`/activities/${activity.id}`}
      className="mb-48 flex h-293 w-168 flex-col gap-18 md:h-344 md:w-221 lg:h-414 lg:w-283"
    >
      <div className="relative h-168 w-168 md:h-221 md:w-221 lg:h-283 lg:w-283">
        <Image
          src={activity.bannerImageUrl && !imageLoadError ? activity.bannerImageUrl : randomBackupThumbnail}
          alt={imageLoadError ? 'Backup Activity Thumbnail' : 'Activity Thumbnail'}
          layout="fill"
          objectFit="cover"
          className="rounded-25"
          onError={handleImageError}
        />
      </div>
      <div className="flex flex-col gap-15">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5">
            <Star width={20} height={20} />
            <span className="text-lg-medium text-black">{activity.rating.toFixed(1)}</span>
            <span className="text-lg-medium text-gray-600">({activity.reviewCount})</span>
          </div>
          <p className="truncate text-black sm:w-168 sm:text-2lg-semibold md:w-220 md:text-2xl-semibold lg:w-282">
            {activity.title}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-black sm:text-xl-bold md:text-2xl-bold">\ {activity.price.toLocaleString()}</span>
          <span className="text-gray-800 sm:text-lg-regular md:text-xl-regular">/</span>
          <span className="text-gray-600 sm:text-lg-regular md:text-xl-regular">인</span>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCards;
