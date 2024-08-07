import Button from '@/components/common/Button';
import Image from 'next/image';

const CancelConfirmPopup = () => {
  return (
    <div className="flex h-184 w-288 flex-col items-center justify-evenly border shadow-modal">
      <div className="flex flex-col items-center justify-between gap-16">
        <Image src="/assets/icons/check.svg" width={24} height={24} alt="" />
        <p className="text-lg-regular text-black">예약을 취소하시겠어요?</p>
      </div>
      <div className="flex gap-8">
        <Button.Default variant="secondary" className="h-38 w-80">
          아니오
        </Button.Default>
        <Button.Default type="submit" className="h-38 w-80">
          취소하기
        </Button.Default>
      </div>
    </div>
  );
};

export default CancelConfirmPopup;
