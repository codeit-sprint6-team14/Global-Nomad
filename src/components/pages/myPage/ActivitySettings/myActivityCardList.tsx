import { Activity } from '@/apis/myPage/myActivitySettings.types';
import MyActivityCard from '@/components/common/Cards/myActivityCard';

import { MyActivityCardListProps } from './types/myActivityCardList.types';

const MyActivityCardList = ({ activitiesData }: MyActivityCardListProps) => {
  return (
    <ul className="flex flex-col gap-16 lg:gap-24">
      {activitiesData?.map((myActivityCard: Activity) => (
        <MyActivityCard key={myActivityCard.id} myActivityCard={myActivityCard} />
      ))}
    </ul>
  );
};

export default MyActivityCardList;
