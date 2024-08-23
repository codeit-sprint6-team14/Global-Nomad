import { MyReservation } from '@/apis/myPage/myReservations.types';
import Filter from '@/components/common/Filter';

import EmptyContent from './emptyContent';
import ReservationCardList from './reservationCardList';

interface ReservationContentProps {
  myReservationsData: MyReservation[];
  showFilter?: boolean;
  isEmptyMyReservationData: boolean;
  onStatusChange: (newStatus: string) => void;
  selectedStatus: string | null;
}

const ReservationContent = ({
  myReservationsData,
  showFilter = false,
  isEmptyMyReservationData = false,
  onStatusChange,
  selectedStatus,
}: ReservationContentProps) => {
  return (
    <>
      <div
        className={`mb-12 md:mb-24 lg:mb-16 lg:flex lg:items-center lg:justify-between ${isEmptyMyReservationData && 'mb-86 md:mb-82 lg:mb-[117px]'}`}
      >
        <h1 className="text-3xl-bold">예약 내역</h1>
        {showFilter && <Filter content="필터" onOptionSelect={onStatusChange} selectedOption={selectedStatus} />}
      </div>
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
