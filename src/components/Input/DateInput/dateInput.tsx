import { DateInputProps } from '@/types/dateInput';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CustomInput from './customInput';

const DateInput = ({ onChange, initialDate, placeholder = 'YY/MM/DD', className }: DateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null);

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
