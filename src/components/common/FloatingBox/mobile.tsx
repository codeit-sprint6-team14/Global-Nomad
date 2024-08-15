import { useReservationSubmit } from '@/hooks/useReservationSubmit';
import { useState } from 'react';

import Button from '../Button';
import DateSelectModal from '../Modal/DateSelect';
import MobileComponents from './MobileComponents';

const Mobile = ({ handleReservationSubmit }: { handleReservationSubmit: () => void }) => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const { isReservationButtonActive, isPending } = useReservationSubmit();

  const handleOpenModal = () => {
    setIsDateModalOpen((prev) => !prev);
  };

  return (
    <>
      {isDateModalOpen && (
        <DateSelectModal setIsModalOpen={setIsDateModalOpen} classNames="fixed bottom-0 w-full z-[9999]" />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 h-83 w-full max-w-[743px] border-y border-gray-300 bg-white">
        <div className="flex items-center justify-between px-16 py-16">
          <div className="flex flex-col">
            <MobileComponents.PriceInfo />
            <MobileComponents.DateInfo handleOpenModal={handleOpenModal} />
          </div>
          <Button.Default
            disabled={isReservationButtonActive || isPending}
            onClick={handleReservationSubmit}
            className="h-54 w-106 hover:bg-gray-800"
          >
            {isPending ? '예약 중...' : '예약하기'}
          </Button.Default>
        </div>
      </div>
    </>
  );
};

export default Mobile;
