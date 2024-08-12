import { DateInputProps } from '@/types/dateInput';
import { ko } from 'date-fns/locale/ko';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CustomInput from './customInput';

const DateInput = ({ onChange, initialDate, placeholder = 'yyyy-mm-dd', className }: DateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);

    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="relative">
      <DatePicker
        locale={ko}
        selected={selectedDate}
        onChange={handleChange}
        placeholderText={placeholder}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        showPopperArrow={false}
        customInput={<CustomInput className={className} />}
        wrapperClassName={`${className}`}
        shouldCloseOnSelect={false}
      />
      <style>{customStyles}</style>
    </div>
  );
};

export default DateInput;

const customStyles = `
.react-datepicker-popper {
  left: 61px !important; /* 기본적으로 오른쪽으로 이동 */
}
.react-datepicker {
  font-size: 1rem;
}
.react-datepicker__month-container {
  width: 250px;
  height: 250px
}
.react-datepicker__day,
.react-datepicker__day-name {
  width: 1.8rem;
  line-height: 1.8rem;
}
.react-datepicker__current-month {
  font-size: 1rem;
}
.react-datepicker__navigation {
  top: 0.5em;
}
.react-datepicker__header {
  padding-top: 0.7em;
}

@media (min-width: 744px) {
  .react-datepicker-popper {
    left: 76px !important; /* 태블릿에서 더 오른쪽으로 */
  }
  .react-datepicker {
    font-size: 1.3rem;
  }
  .react-datepicker__month-container {
    width: 300px; /* 태블릿 크기 */
    height: 290px
  }
    
  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 2.2rem;
    line-height: 2.2rem;
  }
  .react-datepicker__current-month {
    font-size: 1.3rem;
  }
  .react-datepicker__navigation {
    top: 0.5em;
  }
  .react-datepicker__header {
    padding-top: 0.5em;
  }
}


@media (min-width: 1200px) {
  .react-datepicker-popper {
    left: 0px !important; /* 데스크탑에서 더 오른쪽으로 */
  }
  .react-datepicker {
    font-size: 1.3rem;
  }
  .react-datepicker__month-container {
    width: 380px; /* 태블릿 크기 */
    height: 385px
  }
    
  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 2.9rem;
    line-height: 3.1rem;
  }
  .react-datepicker__current-month {
    font-size: 1.5rem;
  }
  .react-datepicker__navigation {
    top: 0.9em;
  }
  .react-datepicker__header {
    padding-top: 0.7em;
  }
}
`;
