import { headCountAtom, reservationPriceAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';

const Footer = () => {
  const price = useAtomValue(reservationPriceAtom);
  const headCount = useAtomValue(headCountAtom);

  return (
    <div>
      <footer className="flex items-center justify-between px-24 py-17">
        <h2 className="text-xl-bold">총 합계</h2>
        <div>
          <span className="text-xl-bold text-black-100">₩ {(price * headCount).toLocaleString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
