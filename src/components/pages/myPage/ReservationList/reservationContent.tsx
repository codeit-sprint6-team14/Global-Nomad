import { MyReservation } from '@/apis/myPage/myReservations.types';
import Filter from '@/components/common/Filter';

import EmptyContent from './emptyContent';
import ReservationCardList from './reservationCardList';

interface ReservationContentProps {
  myReservationsData: MyReservation[];
  showFilter?: boolean;
  isEmpty: boolean;
  onStatusChange: (newStatus: string) => void;
  selectedStatus: string | null;
}

const ReservationContent = ({
  myReservationsData,
  showFilter = false,
  isEmpty = false,
  onStatusChange,
  selectedStatus,
}: ReservationContentProps) => (
  <div>
    <div
      className={`mb-12 md:mb-24 lg:mb-16 lg:flex lg:items-center lg:justify-between ${isEmpty && 'mb-86 md:mb-82 lg:mb-[117px]'}`}
    >
      <h1 className="text-3xl-bold">예약 내역</h1>
      {showFilter && !isEmpty && (
        <Filter content="필터" onOptionSelect={onStatusChange} selectedOption={selectedStatus} />
      )}
    </div>
    {isEmpty ? (
      <div className="md:w-429 lg:w-792">
        <EmptyContent />
      </div>
    ) : (
      <ReservationCardList myReservationsData={myReservationsData} />
    )}
  </div>
);

export default ReservationContent;
