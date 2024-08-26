import { headCountAtom, reservationPriceAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';

const PriceInfo = () => {
  const price = useAtomValue(reservationPriceAtom);
  const headCount = useAtomValue(headCountAtom);

  return (
    <div className="flex items-center">
      <span className="mr-6 text-xl-bold text-black-100">
        ₩ {headCount > 0 ? (price * headCount).toLocaleString() : price.toLocaleString()}
      </span>
      <span className="flex items-center text-2lg-medium text-green-300">
        {headCount > 0 ? `/ 총 ${headCount}인` : '/ 인'}
      </span>
    </div>
  );
};

export default PriceInfo;
