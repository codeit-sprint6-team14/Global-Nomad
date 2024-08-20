import Image from 'next/image';
import Link from 'next/link';

import Star from '../../../../public/assets/icons/star.svg';
import { ActivityCardProps } from './mainPage.type';

const PopularActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group relative mb-48 overflow-hidden rounded-25 sm:h-168 sm:w-168 md:h-384 md:w-384"
    >
      <Image
        src={activity.bannerImageUrl}
        alt="PopularActivityThumnail"
        width={384}
        height={384}
        className="absolute"
      />
      <div className="absolute bottom-0 flex flex-col justify-end px-20 pb-12 pt-30 text-white sm:gap-6 md:gap-20 md:py-30">
        <div className="flex items-center gap-5 text-md-semibold">
          <Star width={20} height={20} />
          <span>{activity.rating}</span>
          <span>({activity.reviewCount})</span>
        </div>
        <p className="line-clamp-2 text-wrap break-words sm:text-2lg-bold md:text-3xl-bold">{activity.title}</p>
        <div className="flex items-center gap-5">
          <span className="sm:text-lg-bold md:text-xl-bold">\ {activity.price.toLocaleString()}</span>
          <span className="text-md-regular text-gray-600">/인</span>
        </div>
      </div>
    </Link>
  );
};

export default PopularActivityCard;
