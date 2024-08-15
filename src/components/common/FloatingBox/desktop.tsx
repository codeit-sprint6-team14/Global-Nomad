import { useReservationSubmit } from '@/hooks/useReservationSubmit';

import Button from '../Button';
import ReservationScheduleSelect from '../ReservationScheduleSelect';
import DesktopComponents from './DesktopComponents';

const Desktop = ({
  classNames,
  handleReservationSubmit,
}: {
  classNames: string;
  handleReservationSubmit: () => void;
}) => {
  const { isReservationButtonActive, isPending } = useReservationSubmit();

  return (
    <section
      className={`${classNames} h-746 rounded-8 border border-gray-300 bg-white px-24 py-17 shadow-[0px_10px_30px_3px_rgba(5,16,55,0.15)]`}
    >
      <DesktopComponents.PriceInfo />
      <h2 className="mb-16 text-xl-bold">날짜</h2>
      <ReservationScheduleSelect />
      <DesktopComponents.ParticipantCounter />
      <Button.Default
        disabled={isReservationButtonActive || isPending}
        className="h-56 w-full hover:bg-gray-800"
        onClick={handleReservationSubmit}
      >
        {isPending ? '예약 중...' : '예약하기'}
      </Button.Default>

      <div className="mb-16 border-b border-gray-300 pb-24"></div>
      <DesktopComponents.TotalPrice />
    </section>
  );
};

export default Desktop;
