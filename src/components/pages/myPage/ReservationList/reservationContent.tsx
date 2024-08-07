import Filter from '@/components/common/Filter';

import EmptyReservationContent from './emptyReservationContent';
import ReservationCardList from './reservationCardList';

const sortOptions = ['예약 신청', '예약 취소', '예약 승인', '예약 거절', '체험 완료'];

const ReservationContent = ({ showFilter = false, isEmpty = false }) => (
  <div className="md: w-429 lg:w-792">
    <div className={`${showFilter ? 'mb-16 flex justify-between' : ''}`}>
      <h1 className="mb-12 text-3xl-bold">예약 내역</h1>
      {showFilter && !isEmpty && <Filter sortOptions={sortOptions} />}
    </div>
    {isEmpty ? (
      <div className="mt-60">
        <EmptyReservationContent />
      </div>
    ) : (
      <ReservationCardList />
    )}
  </div>
);

export default ReservationContent;
