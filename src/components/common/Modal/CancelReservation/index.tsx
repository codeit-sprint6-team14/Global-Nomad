import CheckIcon from '@/../public/assets/icons/ic-check.svg';
import { modalAtom } from '@/store/modalAtom';
import { useSetAtom } from 'jotai';

import Button from '../../Button';

const CancelReservation = () => {
  const setModalType = useSetAtom(modalAtom);
  const baseStyle = 'h-38 w-80 rounded-6 text-md-bold';

  const handleSubmit = () => {
    // TODO: 버튼 제출 로직 추가하기
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    <div className="flex h-184 w-298 flex-col items-center rounded-12 bg-white pt-24">
      <CheckIcon className="mb-16" />
      <p className="mb-32 text-lg-regular">예약을 취소하시겠어요?</p>
      <div className="flex gap-8">
        <Button.Default onClick={handleCloseModal} className={baseStyle} variant="secondary">
          아니오
        </Button.Default>
        <Button.Default onClick={handleSubmit} className={baseStyle}>
          취소하기
        </Button.Default>
      </div>
    </div>
  );
};

export default CancelReservation;
