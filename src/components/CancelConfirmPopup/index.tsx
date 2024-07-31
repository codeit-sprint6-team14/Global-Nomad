import Button from '../Button';

const CancelConfirmPopup = () => {
  return (
    <div className="flex h-184 w-288 flex-col items-center justify-evenly border shadow-modal">
      <div className="flex flex-col items-center justify-between gap-16">
        icon
        <p className="text-lg-regular text-black">예약을 취소하시겠어요?</p>
      </div>
      <div className="flex gap-8">
        <Button variant="secondary" className="h-38 w-80">
          아니오
        </Button>
        <Button type="submit" className="h-38 w-80">
          취소하기
        </Button>
      </div>
    </div>
  );
};

export default CancelConfirmPopup;
