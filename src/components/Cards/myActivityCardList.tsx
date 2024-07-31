import ActivityCardsData from '@/mockData/myActivityCardsData';
import { myActivityCardData } from '@/types/cardListData';
import { useState } from 'react';

import MyActivityCard from './myActivityCard';

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
