import Button from '@/components/common/Button';
import { selectedScheduleStateAtom } from '@/store/activityDetailsAtom';
import { SetStateAction, useSetAtom } from 'jotai';
import { Dispatch } from 'react';

interface FooterProps {
  // isReservationPossible: boolean;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
}
// prop -> isReservationPossible 일정 선택 시 버튼 활성화 기능 구현 예정
const Footer = ({ setIsModalOpen }: FooterProps) => {
  const setIsSelectedSchedule = useSetAtom(selectedScheduleStateAtom);

  const handleScheduleSelect = () => {
    setIsModalOpen?.(false);
    setIsSelectedSchedule(true);
  };

  return (
    <div>
      <footer>
        <Button.Default /*disabled={!isReservationPossible}*/ onClick={handleScheduleSelect} className="h-56 w-full">
          확인
        </Button.Default>
      </footer>
    </div>
  );
};

export default Footer;
