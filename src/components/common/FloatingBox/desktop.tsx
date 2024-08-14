/* eslint-disable @typescript-eslint/no-unused-vars */
import { useActivityReservationMutation } from '@/hooks/useReservationMutation';
import { headCountAtom, scheduleIdAtom, selectedDateAtom, selectedSlotAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';

import Button from '../Button';
import ReservationScheduleSelect from '../ReservationScheduleSelect';
import DesktopComponents from './DesktopComponents';

const Desktop = ({
  activityId,
  classNames,
  buttonLabel,
}: {
  activityId: string;
  classNames: string;
  buttonLabel: string;
}) => {
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedSlot = useAtomValue(selectedSlotAtom);
  const scheduleId = useAtomValue(scheduleIdAtom);
  const headCount = useAtomValue(headCountAtom);

  const { submitReservation, isPending } = useActivityReservationMutation();

  const handleReservationFormSubmit = () => {
    submitReservation({ activityId, scheduleId, headCount });
  };

  const isReservationButtonActive = selectedDate && selectedSlot && headCount > 0 ? false : true;

  return (
    <section
      className={`${classNames} h-746 rounded-8 border border-gray-300 bg-white px-24 py-17 shadow-[0px_10px_30px_3px_rgba(5,16,55,0.15)]`}
    >
      <DesktopComponents.PriceInfo />
      <h2 className="mb-16 text-xl-bold">날짜</h2>
      <ReservationScheduleSelect />
      <DesktopComponents.ParticipantCounter />
      <Button.Default
        disabled={isReservationButtonActive}
        className="h-56 w-full"
        onClick={handleReservationFormSubmit}
      >
        {buttonLabel}
      </Button.Default>
      <div className="mb-16 border-b border-gray-300 pb-24"></div>
      <DesktopComponents.TotalPrice />
    </section>
  );
};

export default Desktop;
