import { MyReservation } from '@/apis/myPage/myReservations.types';

import EmptyContent from './emptyContent';
import ReservationCardList from './reservationCardList';

interface ReservationContentProps {
  myReservationsData: MyReservation[];
  isEmptyMyReservationData: boolean;
}

const ReservationContent = ({ myReservationsData, isEmptyMyReservationData = false }: ReservationContentProps) => {
  return (
    <>
      {isEmptyMyReservationData ? (
        <div className="mb-420 md:mb-601 md:w-429 lg:mb-[469px] lg:w-792">
          <EmptyContent />
        </div>
      ) : (
        <ReservationCardList myReservationsData={myReservationsData} />
      )}
    </>
  );
};
export default ReservationContent;
