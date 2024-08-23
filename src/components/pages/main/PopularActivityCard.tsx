import Star from '@/../public/assets/icons/star.svg';
import Image from 'next/image';
import Link from 'next/link';

import { ActivityCardProps } from './mainPage.type';
import { useBackupImage } from './useBackupImage';

const PopularActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { imageSource, altText, handleImageError } = useBackupImage(activity.bannerImageUrl);

  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group relative mb-48 overflow-hidden rounded-25 sm:h-168 sm:w-168 md:h-384 md:w-384"
    >
      <Image src={imageSource} alt={altText} layout="fill" objectFit="cover" onError={handleImageError} />
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
