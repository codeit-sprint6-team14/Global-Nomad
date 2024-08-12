import Filter from '@/components/common/Filter';

import EmptyContent from './emptyContent';
import ReservationCardList from './reservationCardList';

const sortOptions = ['예약 신청', '예약 취소', '예약 승인', '예약 거절', '체험 완료'];

const ReservationContent = ({ showFilter = false, isEmpty = false }) => (
  <div>
    <div
      className={`mb-12 md:mb-24 lg:mb-16 lg:flex lg:items-center lg:justify-between ${isEmpty ? 'mb-86 md:mb-82 lg:mb-[117px]' : ''}`}
    >
      <h1 className="text-3xl-bold">예약 내역</h1>
      {showFilter && !isEmpty && <Filter sortOptions={sortOptions} />}
    </div>
    {isEmpty ? (
      <div className="md:w-429 lg:w-792">
        <EmptyContent />
      </div>
    ) : (
      <ReservationCardList />
    )}
  </div>
);

export default ReservationContent;
