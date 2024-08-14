import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import Modal from '@/components/common/Modal';
import { useActivityReservationMutation } from '@/hooks/useReservationMutation';
import { activityIdAtom, headCountAtom, scheduleIdAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateSelectModal = () => {
    // TODO: 모달 여닫는 기능 구현
    setIsModalOpen((prev) => !prev);
  };

  const { submitReservation } = useActivityReservationMutation();
  const activityId = useAtomValue(activityIdAtom);
  const headCount = useAtomValue(headCountAtom);
  const scheduleId = useAtomValue(scheduleIdAtom);

  const handleReservationFormSubmit = () => {
    submitReservation({ activityId, scheduleId, headCount });
  };

  return (
    <div>
      <main className="border-b border-gray-300 px-24 pb-24 pt-13">
        <h2 className="mb-5 text-xl-bold">날짜</h2>
        <button onClick={handleDateSelectModal} className="mb-27">
          날짜 선택하기
        </button>
        {isModalOpen && <Modal.DateSelect classNames="absolute right-0 top-0 z-50" setIsModalOpen={setIsModalOpen} />}
        <h2 className="mb-5 text-xl-bold">참여 인원 수</h2>
        <div className="mb-32">
          <Counter />
        </div>
        <Button.Default className="h-56 w-203" onClick={handleReservationFormSubmit}>
          예약하기
        </Button.Default>
      </main>
    </div>
  );
};

export default Main;
