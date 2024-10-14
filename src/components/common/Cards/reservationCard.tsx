import { Reservation } from '@/apis/myPage/myReservations.types';
import Card from '@/components/common/Cards/components';
import { modalAtom } from '@/store/modalAtom';
import { reservationIdAtom } from '@/store/reservationIdAtom';
import { StatusType, getButtonInfo, getCardStatus } from '@/utils/cardStatus';
import { formatPrice } from '@/utils/formatPrice';
import { useAtom, useSetAtom } from 'jotai';

interface ReservationCardProps {
  data: Reservation;
  onCardClick: (reservation: Reservation) => void;
}

const ReservationCard = ({ data, onCardClick }: ReservationCardProps) => {
  const [, setModalType] = useAtom(modalAtom);
  const setReservationId = useSetAtom(reservationIdAtom);

  const {
    id,
    activity: { bannerImageUrl, title },
    status,
    totalPrice,
    headCount,
    date,
    startTime,
    endTime,
    reviewSubmitted,
  } = data;

  const { text: statusText, colorClass } = getCardStatus(status as StatusType);
  const { name: buttonName, action } = getButtonInfo(status as StatusType);

  const handleButtonClick = () => {
    if (action) {
      setReservationId(id);
      setModalType(action);
    }
  };

  const handleCardClick = () => {
    onCardClick(data);
  };

  return (
    <div onClick={handleCardClick}>
      <Card>
        <Card.Image imageUrl={bannerImageUrl} />
        <Card.Header ClassNames={`${colorClass} text-md-bold md:text-lg-bold `} text={statusText} />
        <Card.Title title={title} />
        <Card.Body text={`${date} · ${startTime} - ${endTime} · ${headCount}명`} />
        <Card.Footer
          text={formatPrice(totalPrice)}
          status={status}
          buttonName={!reviewSubmitted ? buttonName : undefined}
          onButtonClick={!reviewSubmitted ? handleButtonClick : undefined}
        />
      </Card>
    </div>
  );
};

export default ReservationCard;
