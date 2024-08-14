import { selectedDateAtom, selectedSlotAtom } from '@/store/activityDetailsAtom';
import { format } from 'date-fns';
import { useAtomValue } from 'jotai';

interface DateInfoProps {
  handleOpenModal: () => void;
}

const DateInfo = ({ handleOpenModal }: DateInfoProps) => {
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedSlot = useAtomValue(selectedSlotAtom);

  const dateString =
    selectedDate && selectedSlot
      ? format(selectedDate, 'yy/MM/dd') + ' ' + selectedSlot.startTime + ' ~ ' + selectedSlot.endTime
      : '';

  return (
    <div>
      {dateString ? (
        <span
          onClick={handleOpenModal}
          className="cursor-pointer border-b border-green-300 text-md-semibold text-green-300 hover:text-gray-700"
        >
          {dateString}
        </span>
      ) : (
        <span
          onClick={handleOpenModal}
          className="cursor-pointer border-b border-green-300 text-md-semibold leading-[17px] text-green-300 hover:text-gray-700"
        >
          날짜 선택하기
        </span>
      )}
    </div>
  );
};

export default DateInfo;
