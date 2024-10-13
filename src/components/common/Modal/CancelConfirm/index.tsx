import Button from '@/components/common/Button';
import { useReservationMutation } from '@/components/common/Cards/hooks/useReservationMutation';
import useToast from '@/hooks/useToast';
import { modalAtom } from '@/store/modalAtom';
import { reservationIdAtom } from '@/store/reservationIdAtom';
import { isAxiosError } from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';

const CancelConfirmPopup = () => {
  const setModalType = useSetAtom(modalAtom);
  const reservationId = useAtomValue(reservationIdAtom);
  const { mutate, error } = useReservationMutation();
  const toast = useToast();

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleCancelReservation = () => {
    if (reservationId) {
      mutate(reservationId, {
        onSuccess: () => {
          handleCloseModal();
          toast.success('예약이 취소되었습니다.');
        },
        onError: (error) => {
          handleCloseModal();
          if (isAxiosError(error)) {
            switch (error.response?.status) {
              case 401:
                toast.error('인증에 실패했습니다. 다시 로그인해주세요.');
                break;
              case 403:
                toast.error('본인의 예약만 취소할 수 있습니다.');
                break;
              default:
                toast.error('예약이 취소되지 못했습니다.. 다시 시도해주세요.');
            }
          } else {
            toast.error('알 수 없는 오류가 발생했습니다.');
          }
        },
      });
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
