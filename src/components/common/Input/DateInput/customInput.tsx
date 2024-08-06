import { CustomInputProps } from '@/types/dateInput';
import Image from 'next/image';
import React, { forwardRef } from 'react';

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, placeholder, className }, ref) => (
    <div className={`relative sm:w-130 md:w-149 lg:w-379 ${className}`}>
      <input
        type="text"
        className="w-full cursor-pointer rounded-4 border border-gray-700 py-5 focus:outline-none focus:ring-1 focus:ring-black-100 sm:h-40 sm:px-12 md:h-56 md:px-16"
        onClick={onClick}
        value={value}
        ref={ref}
        placeholder={placeholder}
        readOnly
      />
      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 sm:right-8 md:right-15">
        <Image src="/icons/calendar.svg" alt="calendar" width={24} height={24} />
      </div>
    </div>
  ),
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
