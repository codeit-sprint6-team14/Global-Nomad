import MyActivityCard from '@/components/common/Cards/myActivityCard';
import ActivityCardsData from '@/mockData/myActivityCardsData';
import { myActivityCardData } from '@/types/cardDataList';
import { useState } from 'react';

const MyActivityCardList = () => {
  const [myActivityCardsData] = useState(ActivityCardsData);

  if (!myActivityCardsData) return null;

  return (
    <ul className="flex flex-col gap-16 lg:gap-24">
      {myActivityCardsData.map((myActivityCard: myActivityCardData) => (
        <MyActivityCard key={myActivityCard.id} myActivityCard={myActivityCard} />
      ))}
    </ul>
  );
};

export default MyActivityCardList;
