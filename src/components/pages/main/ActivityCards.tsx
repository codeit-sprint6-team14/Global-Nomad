import Star from '@/../public/assets/icons/star.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Skeleton from './Skeleton/Skeleton';
import { ActivityCardProps } from './mainPage.type';
import { useBackupImage } from './useBackupImage';

const ActivityCards: React.FC<ActivityCardProps> = ({ activity }) => {
  const { imageSource, altText, handleImageError } = useBackupImage(activity.bannerImageUrl);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const colors = ['bg-purple-100', 'bg-pink-200', 'bg-sky-200'];
    setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  return (
    <Link
      href={`/activities/${activity.id}`}
      className="flex h-293 w-168 flex-col gap-16 sm:mb-16 md:mb-32 md:h-344 md:w-221 lg:mb-48 lg:h-414 lg:w-283"
    >
      <div className="relative h-168 w-168 md:h-221 md:w-221 lg:h-283 lg:w-283">
        <div className={`absolute inset-0 ${backgroundColor} rounded-25 ${imageLoaded ? 'hidden' : 'block'}`}>
          <Skeleton className="h-full w-full rounded-25" />
        </div>
        <Image
          src={imageSource}
          alt={altText}
          fill
          sizes="(max-width: 768px) 168px, (max-width: 1200px) 221px, 283px"
          style={{ objectFit: 'cover' }}
          className={`rounded-25 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={handleImageError}
          onLoad={() => setImageLoaded(true)}
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
