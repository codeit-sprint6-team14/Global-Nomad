import reservationCardsData from '@/mockData/reservationCardsData';
import { reservationCard } from '@/types/cardDataList';
import { useState } from 'react';

import ReservationCard from './reservationCard';

const ReservationCardList = () => {
  const [cardListData] = useState(reservationCardsData);

  if (!cardListData) return null;

  return (
    <ul className="flex flex-col gap-8">
      {cardListData.map((card: reservationCard) => (
        <ReservationCard key={card.id} card={card} />
      ))}
    </ul>
  );
};

export default ReservationCardList;
