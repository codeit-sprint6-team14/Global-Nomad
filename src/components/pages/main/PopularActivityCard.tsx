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

const PopularActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
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
      className="group relative mb-48 overflow-hidden rounded-25 sm:h-168 sm:w-168 md:h-384 md:w-384"
    >
      <Image
        src={activity.bannerImageUrl && !imageLoadError ? activity.bannerImageUrl : randomBackupThumbnail}
        alt={imageLoadError ? 'Backup Popular Activity Thumbnail' : 'Popular Activity Thumbnail'}
        layout="fill"
        objectFit="cover"
        onError={handleImageError}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <div className="flex items-center gap-2">
          <Star width={16} height={16} />
          <span className="text-sm">{activity.rating.toFixed(1)}</span>
          <span className="text-sm">({activity.reviewCount})</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold">{activity.title}</h3>
        <p className="mt-1 text-sm">
          ₩{activity.price.toLocaleString()} <span className="text-xs opacity-70">/인</span>
        </p>
      </div>
    </Link>
  );
};

export default PopularActivityCard;
