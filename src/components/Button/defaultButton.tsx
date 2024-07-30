import { DefaultButtonVariant, ButtonProps } from '@/types/buttonTypes';

const DefaultButton = ({
  disabled = false,
  type = 'button',
  className = '',
  variant = 'primary',
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  const getButtonStyles = (variant: DefaultButtonVariant, disabled: boolean, className: string) => {
    const baseStyle = 'text-lg-bold w-350 h-48 rounded-6';
    const disabledStyle = 'bg-gray-600 cursor-not-allowed text-white';
    const variantStyles = {
      primary: 'bg-black-100 text-white',
      secondary: 'bg-white text-black-100 border border-black-100',
    };

    return `${baseStyle} ${disabled ? disabledStyle : variantStyles[variant]} ${className}`;
  };

  return (
    <div>
      <button
        disabled={disabled}
        type={type}
        className={getButtonStyles(variant, disabled, className)}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default DefaultButton;
