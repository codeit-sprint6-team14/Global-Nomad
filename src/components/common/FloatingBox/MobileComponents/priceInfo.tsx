import { ReservationPriceAtom, headCountAtom, selectedScheduleStateAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';

const PriceInfo = () => {
  const isSelectedSchedule = useAtomValue(selectedScheduleStateAtom);
  const price = useAtomValue(ReservationPriceAtom);
  const headCount = useAtomValue(headCountAtom);

  return (
    <div className="flex items-center">
      <span className="mr-6 text-xl-bold text-black-100">
        ₩ {isSelectedSchedule ? price * headCount : price.toLocaleString()}
      </span>
      <span className="flex items-center text-2lg-medium text-green-300">
        {isSelectedSchedule ? `/ 총 ${headCount}인` : '/ 1인'}
      </span>
    </div>
  );
};

export default PriceInfo;
