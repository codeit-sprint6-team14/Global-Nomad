import Image from 'next/image';
import Link from 'next/link';

import Star from '../../../../public/assets/icons/star.svg';
import { ActivityCardProps } from './mainPage.type';

const ActivityCards: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <Link href={`/activities/${activity.id}`} className="mb-48 flex h-414 w-283 flex-col gap-18">
      <div className="relative h-283 w-283">
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
          <p className="w-282 truncate text-2xl-semibold text-black">{activity.title}</p>
        </div>
        <div className="flex gap-5">
          <span className="text-2xl-bold text-black">\ {activity.price.toLocaleString()}</span>
          <span className="text-xl-regular text-gray-800">/</span>
          <span className="text-xl-regular text-gray-600">인</span>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCards;
