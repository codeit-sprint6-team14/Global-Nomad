import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import Modal from '@/components/common/Modal';
import { useReservationSubmit } from '@/hooks/useReservationSubmit';
import { format } from 'date-fns';
import { useState } from 'react';

const Main = ({ handleReservationSubmit }: { handleReservationSubmit: () => void }) => {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const { isPending, isReservationButtonActive, selectedDate, selectedSlot } = useReservationSubmit();

  const handleDateSelectModal = () => {
    setIsCalendarModalOpen((prev) => !prev);
  };

  const dateString =
    selectedDate && selectedSlot
      ? format(selectedDate, 'yy/MM/dd') + ' ' + selectedSlot.startTime + ' ~ ' + selectedSlot.endTime
      : '';

  return (
    <div>
      <main className="border-b border-gray-300 px-24 pb-24 pt-13">
        <h2 className="mb-5 text-xl-bold">날짜</h2>
        {dateString ? (
          <span
            onClick={handleDateSelectModal}
            className="cursor-pointer border-b border-black-100 text-lg-semibold text-black-100 hover:text-gray-700"
          >
            {dateString}
          </span>
        ) : (
          <span
            onClick={handleDateSelectModal}
            className="cursor-pointer border-b border-black-100 text-lg-semibold text-black-100 hover:text-gray-700"
          >
            날짜 선택하기
          </span>
        )}
        {isCalendarModalOpen && (
          <Modal.DateSelect classNames="absolute right-0 top-0 z-50" setIsModalOpen={setIsCalendarModalOpen} />
        )}
        <h2 className="mt-27 text-xl-bold">참여 인원 수</h2>
        <div className="mb-32 mt-5">
          <Counter />
        </div>
        <Button.Default
          className="h-56 w-203 hover:bg-gray-800"
          onClick={handleReservationSubmit}
          disabled={isReservationButtonActive || isPending}
        >
          {isPending ? '예약 중...' : '예약하기'}
        </Button.Default>
      </main>
    </div>
  );
};

export default Main;
