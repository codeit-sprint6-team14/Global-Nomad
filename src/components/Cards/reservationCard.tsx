import Card from '@/components/Cards/components';
import { reservationCard } from '@/types/cardDataList';
import getCardStatus, { StatusType } from '@/utils/cardStatus';
import { formatPrice } from '@/utils/formatPrice';

const ReservationCard = ({ card }: { card: reservationCard }) => {
  const { bannerImageUrl, title } = card.activity;
  const { status, totalPrice, headCount, date, startTime, endTime } = card;

  const { text: statusText, colorClass } = getCardStatus(status as StatusType);

  return (
    <Card>
      <Card.Image imageUrl={bannerImageUrl} />
      <Card.Header ClassNames={`${colorClass} text-md-bold md:text-lg-bold `} text={statusText} />
      <Card.Title title={title} />
      <Card.Body text={`${date} · ${startTime} - ${endTime} · ${headCount}명`} />
      <Card.Footer
        text={formatPrice(totalPrice)}
        status={status}
        buttonName={status === 'pending' ? '예약 취소' : status === 'completed' ? '후기 작성' : ''}
      />
    </Card>
  );
};

export default ReservationCard;
