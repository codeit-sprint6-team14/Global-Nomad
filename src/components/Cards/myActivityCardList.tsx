import { ActivityCardsDataType } from '@/types/CardListData';
import { useState } from 'react';

import MyActivityCard from './myActivityCard';
import ActivityCardsData from './myActivityCardsData';

const MyActivityCardList = () => {
  const [myActivityCardsData] = useState(ActivityCardsData);

  if (!myActivityCardsData) return null;

  return (
    <ul className="flex flex-col gap-16">
      {myActivityCardsData.map((myActivityCard: ActivityCardsDataType) => (
        <MyActivityCard
          key={myActivityCard.id}
          myActivityCard={myActivityCard}
        />
      ))}
    </ul>
  );
};

export default MyActivityCardList;
