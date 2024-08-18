import Button from '@/components/common/Button';

type PopupProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const RegisterConfirmPopup = ({ onClose, children }: PopupProps) => {
  return (
    <div className="relative flex h-220 w-327 flex-col items-center rounded-8 border bg-white md:h-250 md:w-540">
      <span className="absolute top-[35%] text-lg-medium text-black-100 md:top-[40%] md:text-2lg-medium">
        {children}
      </span>
      <Button.Default
        className="absolute bottom-20 right-[30%] h-42 sm:w-138 md:right-30 md:h-48 md:w-120"
        onClick={onClose}
      >
        확인
      </Button.Default>
    </div>
  );
};

export default RegisterConfirmPopup;
