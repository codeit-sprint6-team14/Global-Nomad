// components/ReservationCard.tsx
import Card from '@/components/Cards';
import { Card as CardType } from '@/types/CardListData';
import getCardStatus from '@/utils/cardStatus';

const ReservationCard = ({ card }: { card: CardType }) => {
  const { bannerImageUrl, title } = card.activity;
  const { status, totalPrice, headCount, date, startTime, endTime } = card;

  const statusText = getCardStatus(
    status as 'pending' | 'confirmed' | 'completed' | 'declined' | 'canceled',
  );

  return (
    <Card>
      <Card.Image imageUrl={bannerImageUrl} />
      <div className="flex w-full flex-col justify-between overflow-hidden py-9 pl-8 pr-14 md:py-12 md:pl-12 md:pr-16 lg:px-24 lg:py-21">
        <Card.Header cardType="reservation" text={statusText} />
        <Card.Title title={title} />
        <Card.Body
          text={`${date} · ${startTime} - ${endTime} · ${headCount}명`}
        />
        <Card.Footer
          text={`₩${totalPrice}`}
          buttonName={status === 'pending' ? '예약 취소' : '후기 작성'}
        />
      </div>
    </Card>
  );
};

export default ReservationCard;
