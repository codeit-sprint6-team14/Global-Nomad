/* eslint-disable @typescript-eslint/no-unused-vars */
import { MyReservation } from '@/apis/myPage/myReservations.types';
import Card from '@/components/common/Cards/components';
import { completedReviewsAtom } from '@/store/completedReviewAtom';
import { modalAtom } from '@/store/modalAtom';
import { reservationIdAtom } from '@/store/reservationIdAtom';
import { StatusType, getButtonInfo, getCardStatus } from '@/utils/cardStatus';
import { formatPrice } from '@/utils/formatPrice';
import { useAtom, useSetAtom } from 'jotai';

const ReservationCard = ({ myReservationData }: { myReservationData: MyReservation }) => {
  const [modalType, setModalType] = useAtom(modalAtom);
  const setReservationId = useSetAtom(reservationIdAtom);
  const [completedReviews] = useAtom(completedReviewsAtom);

  const { id: reservationId, activity, status, totalPrice, headCount, date, startTime, endTime } = myReservationData;
  const { id: activityId, bannerImageUrl, title } = activity;
  const { text: statusText, colorClass } = getCardStatus(status as StatusType);
  const { name: buttonName, action } = getButtonInfo(status as StatusType);

  const isReviewCompleted = completedReviews.includes(reservationId);

  const handleButtonClick = () => {
    if (action !== null && !isReviewCompleted) {
      setReservationId(reservationId);
      setModalType(action);
    }
  };

  return (
    <>
      <Card>
        <Card.Image imageUrl={bannerImageUrl} />
        <Card.Header ClassNames={`${colorClass} text-md-bold md:text-lg-bold `} text={statusText} />
        <Card.Title title={title} />
        <Card.Body text={`${date} · ${startTime} - ${endTime} · ${headCount}명`} />
        {!isReviewCompleted ? (
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
    </>
  );
};

export default ReservationCard;
