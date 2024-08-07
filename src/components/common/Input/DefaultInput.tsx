import { InputProps } from '@/types/defaultInputTypes';

const DefaultInput = ({
  type = 'text',
  className,
  error = false,
  placeholder = '입력',
  isAuth = false,
  register,
  ...props
}: InputProps) => {
  const baseStyle = `
    block w-full outline-none placeholder:text-gray-600 text-14 md:text-16 focus:border-[1.5px]
    ${isAuth ? 'rounded-6 h-58 border-gray-600' : 'border-gray-700 rounded-4 h-56'}
    pl-16 pr-40 border
  `;
  const normalBorder = 'focus:border-green-300';
  const errorBorder = 'border-red-500 focus:border-red-200';

  const styleClass = `${baseStyle} ${error ? errorBorder : normalBorder}`;

  return (
    <input className={`${styleClass} ${className}`} type={type} placeholder={placeholder} {...register} {...props} />
  );
};

export default DefaultInput;
