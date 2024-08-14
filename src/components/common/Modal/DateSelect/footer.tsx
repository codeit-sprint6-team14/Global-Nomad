import Button from '@/components/common/Button';
import { selectedScheduleStateAtom } from '@/store/activityDetailsAtom';
import { SetStateAction, useSetAtom } from 'jotai';
import { Dispatch } from 'react';

interface FooterProps {
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const Footer = ({ setIsModalOpen }: FooterProps) => {
  const setIsSelectedSchedule = useSetAtom(selectedScheduleStateAtom);

  const handleScheduleSelect = () => {
    setIsModalOpen?.(false);
    setIsSelectedSchedule(true);
  };

  return (
    <div>
      <footer>
        <Button.Default onClick={handleScheduleSelect} className="h-56 w-full">
          확인
        </Button.Default>
      </footer>
    </div>
  );
};

export default Footer;
