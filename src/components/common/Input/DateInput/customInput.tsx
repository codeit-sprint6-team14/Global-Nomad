import { CustomInputProps } from '@/types/dateInput';
import Image from 'next/image';
import React, { forwardRef, useState } from 'react';

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, placeholder, className }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);

      if (onClick) onClick();
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <div className={`relative sm:w-130 md:w-149 lg:w-379 ${className}`}>
        <input
          type="text"
          className={`h-full w-full cursor-pointer rounded-4 border border-gray-700 py-5 focus:outline-none sm:h-44 sm:px-12 md:h-56 md:px-16 ${className} ${isFocused && 'border-green-300'}`}
          onClick={handleFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          ref={ref}
          placeholder={placeholder}
          readOnly
        />
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 sm:right-8 md:right-15">
          <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} />
        </div>
      </div>
    );
  },
);

export default CustomInput;

CustomInput.displayName = 'CustomInput';
