/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button = ({
  disabled = false,
  type = 'button',
  className = '',
  variant = 'primary',
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  const baseStyle = 'text-lg-bold w-350 h-48 rounded-6';
  const disabledStyle = 'bg-gray-600 cursor-not-allowed text-white';
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-black-100 text-white',
    secondary: 'bg-white text-black-100 border border-black-100',
  };

  return (
    <div>
      <button
        disabled={disabled}
        type={type}
        className={`${baseStyle} ${disabled ? disabledStyle : variantStyles[variant]} ${className}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
