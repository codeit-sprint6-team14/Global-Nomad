import { ReservationPriceAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';

const Header = () => {
  const price = useAtomValue(ReservationPriceAtom);
  return (
    <div>
      <header className="flex items-center border-b border-gray-300 px-24 pb-16 pt-24">
        <span className="mr-5 text-2xl-bold text-black-100">₩ {price.toLocaleString()}</span>
        <span className="text-lg-regular text-gray-800"> / 인</span>
      </header>
    </div>
  );
};

export default Header;
