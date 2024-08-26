import Star from '@/../public/assets/icons/star.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Skeleton from './Skeleton/Skeleton';
import { ActivityCardProps } from './mainPage.type';
import { useBackupImage } from './useBackupImage';

const PopularActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
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
      className="group relative mb-48 overflow-hidden rounded-25 sm:h-168 sm:w-168 md:h-384 md:w-384"
    >
      <div className={`absolute inset-0 ${backgroundColor} ${imageLoaded ? 'hidden' : 'block'}`}>
        <Skeleton className="h-full w-full" />
      </div>
      <Image
        src={imageSource}
        alt={altText}
        layout="fill"
        objectFit="cover"
        className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleImageError}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
      <div className="absolute inset-0 flex flex-col justify-end text-white sm:gap-6 sm:px-20 sm:py-12 md:gap-20 md:px-20 md:py-30">
        <div className="flex items-center gap-5 text-md-semibold">
          <Star width={16} height={16} />
          <span>{activity.rating.toFixed(1)}</span>
          <span>({activity.reviewCount})</span>
        </div>
        <h3 className="line-clamp-2 sm:h-52 sm:text-2lg-bold md:h-84 md:w-251 md:text-3xl-bold">{activity.title}</h3>
        <p className="flex items-center gap-5 sm:text-lg-bold md:text-xl-bold">
          <span>₩</span>
          <span>{activity.price.toLocaleString()}</span>
          <span className="text-md-regular text-gray-600">/ 인</span>
        </p>
      </div>
    </Link>
  );
};

export default PopularActivityCard;
