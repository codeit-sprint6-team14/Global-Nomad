import Image from 'next/image';
import Link from 'next/link';

import Star from '../../../../public/assets/icons/star.svg';
import { ActivityCardProps } from './mainPage.type';

const ActivityCards: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <Link
      href={`/activities/${activity.id}`}
      className="mb-48 flex h-293 w-168 flex-col gap-18 md:h-344 md:w-221 lg:h-414 lg:w-283"
    >
      <div className="relative h-168 w-168 md:h-221 md:w-221 lg:h-283 lg:w-283">
        <Image
          src={activity.bannerImageUrl}
          alt="ActivityThumnail"
          layout="fill"
          objectFit="cover"
          className="rounded-25"
        />
      </div>
      <div className="flex flex-col gap-15">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5">
            <Star width={20} height={20} />
            <span className="text-lg-medium text-black">{activity.rating}</span>
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
