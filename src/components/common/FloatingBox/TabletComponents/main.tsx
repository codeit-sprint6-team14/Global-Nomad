import { useActivityReservationMutation } from '@/apis/ActivityDetailsPage/useReservationMutation';
import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import Modal from '@/components/common/Modal';
import {
  activityIdAtom,
  headCountAtom,
  scheduleIdAtom,
  selectedDateAtom,
  selectedSlotAtom,
} from '@/store/activityDetailsAtom';
import { format } from 'date-fns';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activityId = useAtomValue(activityIdAtom);
  const headCount = useAtomValue(headCountAtom);
  const scheduleId = useAtomValue(scheduleIdAtom);
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedSlot = useAtomValue(selectedSlotAtom);

  const handleDateSelectModal = () => {
    // TODO: 모달 여닫는 기능 구현
    setIsModalOpen((prev) => !prev);
  };

  const { submitReservation } = useActivityReservationMutation();

  const handleReservationSubmit = () => {
    submitReservation({ activityId, scheduleId, headCount });
  };

  const isReservationButtonActive = selectedDate && selectedSlot && headCount > 0 ? false : true;

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
        {isModalOpen && <Modal.DateSelect classNames="absolute right-0 top-0 z-50" setIsModalOpen={setIsModalOpen} />}
        <h2 className="mt-27 text-xl-bold">참여 인원 수</h2>
        <div className="mb-32 mt-5">
          <Counter />
        </div>
        <Button.Default
          className="h-56 w-203 hover:bg-gray-800"
          onClick={handleReservationSubmit}
          disabled={isReservationButtonActive}
        >
          예약하기
        </Button.Default>
      </main>
    </div>
  );
};

export default Main;
