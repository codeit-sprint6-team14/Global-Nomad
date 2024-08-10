import Button from '@/components/common/Button';
import { useActivityReservationMutation } from '@/hooks/useReservationMutation';
import { activityIdAtom, formSubmitDataAtom } from '@/store/activityDetailsAtom';
import { useAtomValue } from 'jotai';

interface FooterProps {
  isReservationPossible: boolean;
}

const Footer = ({ isReservationPossible }: FooterProps) => {
  const { submitReservation } = useActivityReservationMutation();
  const activityId = useAtomValue(activityIdAtom);
  const submitFormData = useAtomValue(formSubmitDataAtom);

  const handleReservationFormSubmit = () => {
    submitReservation(activityId, submitFormData);
  };

  return (
    <div>
      <footer>
        <Button.Default disabled={!isReservationPossible} className="h-56 w-432" onClick={handleReservationFormSubmit}>
          확인
        </Button.Default>
      </footer>
    </div>
  );
};

export default Footer;
