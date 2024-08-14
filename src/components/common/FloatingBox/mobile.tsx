import { useActivityReservationMutation } from '@/apis/ActivityDetailsPage/postActivityReservation';
import {
  activityIdAtom,
  headCountAtom,
  scheduleIdAtom,
  selectedDateAtom,
  selectedSlotAtom,
} from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

import Button from '../Button';
import DateSelectModal from '../Modal/DateSelect';
import MobileComponents from './MobileComponents';

const Mobile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activityId = useAtomValue(activityIdAtom);
  const scheduleId = useAtomValue(scheduleIdAtom);
  const headCount = useAtomValue(headCountAtom);
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedSlot = useAtomValue(selectedSlotAtom);

  const { submitReservation } = useActivityReservationMutation();

  const handleReservationSubmit = () => {
    submitReservation({ activityId, scheduleId, headCount });
  };

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const isReservationButtonActive = selectedDate && selectedSlot && headCount > 0 ? false : true;

  return (
    <>
      {isModalOpen && <DateSelectModal setIsModalOpen={setIsModalOpen} classNames="fixed bottom-0 w-full z-[9999]" />}

      <div className="fixed bottom-0 left-0 right-0 z-50 h-83 w-full max-w-[743px] border-y border-gray-300 bg-white">
        <div className="flex items-center justify-between px-16 py-16">
          <div className="flex flex-col">
            <MobileComponents.PriceInfo />
            <MobileComponents.DateInfo handleOpenModal={handleOpenModal} />
          </div>
          <Button.Default
            disabled={isReservationButtonActive}
            onClick={handleReservationSubmit}
            className="h-54 w-106 hover:bg-gray-800"
          >
            예약하기
          </Button.Default>
        </div>
      </div>
    </>
  );
};

export default Mobile;
