import Button from '@/components/common/Button';

type PopupProps = {
  children: React.ReactNode;
  onClose: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  countdown?: number;
  showCountdown?: boolean;
};

const RegisterConfirmPopup = ({
  children,
  onClose,
  onCancel,
  showCancelButton,
  countdown,
  showCountdown,
}: PopupProps) => {
  return (
    <div className="relative flex h-220 w-327 flex-col items-center rounded-8 border bg-white md:h-250 md:w-540">
      <span className="absolute top-[35%] text-lg-medium text-black-100 md:top-[40%] md:text-2lg-medium">
        {children}
      </span>
      {showCountdown && (
        <span className="absolute top-[60%] text-md-medium text-gray-500">페이지는 {countdown}초 뒤에 사라집니다.</span>
      )}
      {showCancelButton && (
        <Button.Default
          variant="secondary"
          className="absolute bottom-20 right-160 h-42 hover:bg-gray-300 sm:w-138 md:h-48 md:w-120"
          onClick={onCancel}
        >
          취소
        </Button.Default>
      )}
      <Button.Default
        className="absolute bottom-20 right-[30%] h-42 hover:bg-gray-800 sm:w-138 md:right-30 md:h-48 md:w-120"
        onClick={onClose}
      >
        확인
      </Button.Default>
    </div>
  );
};

export default RegisterConfirmPopup;
