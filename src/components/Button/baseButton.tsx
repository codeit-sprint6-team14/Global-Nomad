import { BaseButtonProps } from '@/types/buttonTypes';

const BaseButton = ({
  disabled = false,
  type = 'button',
  className = '',
  children,
  onClick,
  ...rest
}: BaseButtonProps) => {
  return (
    <div>
      <button disabled={disabled} type={type} className={className} onClick={onClick} {...rest}>
        {children}
      </button>
    </div>
  );
};

export default BaseButton;
