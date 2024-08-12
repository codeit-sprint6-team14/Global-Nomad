import Image from 'next/image';

import Star from '../../../../public/assets/icons/star.svg';
import { Activity } from './mainPage.type';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="flex h-414 w-283 flex-col gap-18">
      <Image src={activity.bannerImageUrl} alt="banner" width={283} height={283} className="rounded-25" />
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
          <span className="text-2xl-bold text-black">\ {activity.price}</span>
          <span className="text-xl-regular text-gray-800">/</span>
          <span className="text-xl-regular text-gray-600">인</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
