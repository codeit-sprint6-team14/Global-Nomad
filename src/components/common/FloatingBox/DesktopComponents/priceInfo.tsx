import { ReservationPriceAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';

const PriceInfo = () => {
  const price = useAtomValue(ReservationPriceAtom);
  return (
    <div className="mb-16 flex items-center border-b border-gray-300 pb-11">
      <span className="mr-5 text-3xl-bold text-black-100">₩ {price.toLocaleString()}</span>
      <span className="text-xl-regular text-gray-800"> / 인</span>
    </div>
  );
};

export default PriceInfo;
