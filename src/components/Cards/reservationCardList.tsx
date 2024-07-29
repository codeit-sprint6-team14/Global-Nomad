// components/Cards.tsx
import { Card as CardType } from '@/types/CardListData';
import { useState } from 'react';

import reservationCardsData from './cardDataList';
import ReservationCard from './reservationCard';

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
