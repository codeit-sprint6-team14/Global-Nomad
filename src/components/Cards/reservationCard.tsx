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
      <Card.Header
        textClassNames="text-md-bold md:text-lg-bold"
        text={statusText}
      />
      <Card.Title title={title} />
      <Card.Body
        text={`${date} · ${startTime} - ${endTime} · ${headCount}명`}
      />
      <Card.Footer
        text={`₩${totalPrice}`}
        status={status}
        buttonName={
          status === 'pending'
            ? '예약 취소'
            : status === 'completed'
              ? '후기 작성'
              : ''
        }
      />
    </Card>
  );
};

export default ReservationCard;
