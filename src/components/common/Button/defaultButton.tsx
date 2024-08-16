import { ButtonProps, DefaultButtonVariant } from '@/types/buttonTypes';

import BaseButton from './baseButton';

const DefaultButton = ({ variant = 'primary', disabled, className = '', ...props }: ButtonProps) => {
  const getVariantStyles = (
    variant: DefaultButtonVariant,
    disabled: boolean | undefined,
    className: string | undefined,
  ) => {
    const baseStyle = 'text-lg-bold rounded-6';
    const disabledStyle = 'bg-gray-600 cursor-not-allowed text-white';
    const variantStyles = {
      primary: 'bg-black-100 text-white',
      secondary: 'bg-white text-black-100 border border-black-100',
    };

    return `${baseStyle} ${disabled ? disabledStyle : variantStyles[variant]} ${className}`;
  };

  return <BaseButton className={`${getVariantStyles(variant, disabled, className)}`} {...props} disabled={disabled} />;
};

export default DefaultButton;
