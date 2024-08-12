import Image from 'next/image';
import Link from 'next/link';

import Star from '../../../../public/assets/icons/star.svg';
import { ActivityCardProps } from './mainPage.type';

const PopularActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <Link href={`/activities/${activity.id}`} className="group relative h-384 w-384 overflow-hidden rounded-25">
      <Image
        src={activity.bannerImageUrl}
        alt="PopularActivityThumnail"
        width={384}
        height={384}
        className="absolute"
      />
      <div className="absolute bottom-0 flex flex-col justify-end gap-20 px-20 py-30 text-white">
        <div className="flex items-center gap-5 text-md-semibold">
          <Star width={20} height={20} />
          <span>{activity.rating}</span>
          <span>({activity.reviewCount})</span>
        </div>
        <p className="text-3xl-bold">{activity.title}</p>
        <div className="flex items-center gap-5">
          <span className="text-xl-bold">\ {activity.price.toLocaleString()}</span>
          <span className="text-md-regular text-gray-600">/인</span>
        </div>
      </div>
    </Link>
  );
};

export default PopularActivityCard;
