import { headCountAtom, reservationPriceAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';

const TotalPrice = () => {
  const price = useAtomValue(reservationPriceAtom);
  const headCount = useAtomValue(headCountAtom);

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl-bold">총 합계</h2>
      <div>
        <span className="text-xl-bold text-black-100">₩ {(price * headCount).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default TotalPrice;
