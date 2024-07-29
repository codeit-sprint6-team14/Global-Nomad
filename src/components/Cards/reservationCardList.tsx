import { Card as CardType } from '@/types/CardListData';
import { useState } from 'react';

import ReservationCard from './reservationCard';
import reservationCardsData from './reservationCardsData';

const Cards = () => {
  const [cardListData] = useState(reservationCardsData);

  if (!cardListData) return null;

  return (
    <ul className="flex flex-col gap-8">
      {cardListData.map((card: CardType) => (
        <ReservationCard key={card.id} card={card} />
      ))}
    </ul>
  );
};

export default Cards;
