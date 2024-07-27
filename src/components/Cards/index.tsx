import CardItem from '@/components/Cards/cardItem';
import { Card } from '@/types/CardListData';
import { useState } from 'react';

import CardsData from './cardDataList';

const Cards = () => {
  const [cardListData] = useState(CardsData);

  if (!cardListData) return null;

  return (
    <ul className="flex flex-col gap-8">
      {cardListData.map((card: Card) => (
        <CardItem card={card} key={card.id} />
      ))}
    </ul>
  );
};

export default Cards;
