import { Reservation } from '@/apis/myPage/myReservations.types';
import Card from '@/components/common/Cards/components';
import { modalAtom } from '@/store/modalAtom';
import { reservationIdAtom } from '@/store/reservationIdAtom';
import { StatusType, getButtonInfo, getCardStatus } from '@/utils/cardStatus';
import { formatPrice } from '@/utils/formatPrice';
import { useAtom, useSetAtom } from 'jotai';

const ReservationCard = ({
  data,
  onCardClick,
}: {
  data: Reservation;
  onCardClick: (reservation: Reservation) => void;
}) => {
  const [, setModalType] = useAtom(modalAtom);
  const setReservationId = useSetAtom(reservationIdAtom);

  const {
    id: reservationId,
    activity,
    status,
    totalPrice,
    headCount,
    date,
    startTime,
    endTime,
    reviewSubmitted,
  } = data;
  const { bannerImageUrl, title } = activity;
  const { text: statusText, colorClass } = getCardStatus(status as StatusType);
  const { name: buttonName, action } = getButtonInfo(status as StatusType);

  const handleButtonClick = () => {
    if (action !== null) {
      setReservationId(reservationId);
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
        {reviewSubmitted === false ? (
          <Card.Footer
            text={formatPrice(totalPrice)}
            status={status}
            buttonName={buttonName}
            onButtonClick={handleButtonClick}
          />
        ) : (
          <Card.Footer text={formatPrice(totalPrice)} status={status} />
        )}
      </Card>
    </div>
  );
};

export default ReservationCard;
