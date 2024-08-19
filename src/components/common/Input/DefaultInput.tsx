import { InputProps } from '@/types/defaultInputTypes';
import { forwardRef } from 'react';

const DefaultInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = 'text', className, error = false, placeholder = '입력', isAuth = false, value, register, ...props },
    ref,
  ) => {
    const baseStyle = `
      block w-full outline-none placeholder:text-gray-600 text-lg-regular md:text-16 focus:border-[1.5px]
      ${isAuth ? 'rounded-6 h-58 border-gray-600' : 'border-gray-700 rounded-4 h-56'}
      pl-16 pr-40 border
    `;
    const styleClass = `${baseStyle} ${error ? 'errorBorder' : 'normalBorder'}`;

    return (
      <input
        ref={ref}
        className={`${styleClass} ${className}`}
        value={value ?? ''}
        type={type}
        placeholder={placeholder}
        {...register}
        {...props}
      />
    );
  },
);

export default DefaultInput;

DefaultInput.displayName = 'DefaultInput';
