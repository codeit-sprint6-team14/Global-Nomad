import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  type?: string;
  error?: boolean;
  className?: string;
  placeholder: string;
  isAuth?: boolean;
  register?: UseFormRegisterReturn;
};

const DefaultInput = ({
  id,
  type = 'text',
  className,
  error = false,
  placeholder = '입력',
  isAuth = false,
  register,
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
    <input
      id={id}
      className={`${styleClass} ${className}`}
      type={type}
      placeholder={placeholder}
      {...register}
    />
  );
};

export default DefaultInput;
