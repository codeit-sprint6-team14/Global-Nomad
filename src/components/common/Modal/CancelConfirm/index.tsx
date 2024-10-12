import Button from '@/components/common/Button';
import { useReservationMutation } from '@/components/common/Cards/hooks/useReservationMutation';
import { modalAtom } from '@/store/modalAtom';
import { reservationIdAtom } from '@/store/reservationIdAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';

const CancelConfirmPopup = () => {
  const setModalType = useSetAtom(modalAtom);
  const reservationId = useAtomValue(reservationIdAtom);
  const { mutate, error } = useReservationMutation();

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleCancelReservation = () => {
    if (reservationId) {
      mutate(reservationId);
      handleCloseModal();
    }
  };

  return (
    <>
      {error && <div className="mb-4 text-red-500">{error.message}</div>}
      <div className="flex h-184 w-288 flex-col items-center justify-evenly rounded-12 border bg-white shadow-modal">
        <div className="flex flex-col items-center justify-between gap-16">
          <Image src="/assets/icons/check.svg" width={24} height={24} alt="체크 아이콘" />
          <p className="text-lg-regular text-black">예약을 취소하시겠어요?</p>
        </div>
        <div className="flex gap-8">
          <Button.Default onClick={handleCloseModal} variant="secondary" className="h-38 w-80">
            아니오
          </Button.Default>
          <Button.Default onClick={handleCancelReservation} type="submit" className="h-38 w-80">
            취소하기
          </Button.Default>
        </div>
      </div>
    </>
  );
};

export default CancelConfirmPopup;
