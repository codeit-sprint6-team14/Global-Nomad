import Image from 'next/image';
import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DateInputProps = {
  onChange?: (date: Date | null) => void;
  initialDate?: Date;
  placeholder?: string;
  className?: string;
};

type CustomInputProps = React.HTMLProps<HTMLInputElement> & {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  className?: string;
};

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
        <Image
          src="./images/icon-calendar.svg"
          alt="calendar"
          width={24}
          height={24}
        />
      </div>
    </div>
  ),
);

CustomInput.displayName = 'CustomInput';

const DateInput = ({
  onChange,
  initialDate,
  placeholder = 'YY/MM/DD',
  className,
}: DateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null,
  );

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      placeholderText={placeholder}
      minDate={new Date()}
      dateFormat="yy/MM/dd"
      showPopperArrow={false}
      customInput={<CustomInput className={className} />}
      wrapperClassName={`${className}`}
    />
  );
};

export default DateInput;
