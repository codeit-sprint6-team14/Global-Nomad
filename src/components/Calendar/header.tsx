import NextButton from '@/../public/svgs/ic-next-button.svg';
import PrevButton from '@/../public/svgs/ic-prev-button.svg';
import { MONTHS } from '@/constants/date';
import { CalendarHeaderProps } from '@/types/calendarTypes';
import React from 'react';

const Header = ({ currentMonth, handlePrevMonth, handleNextMonth, isAfterCurrentMonth }: CalendarHeaderProps) => {
  return (
    <div className="flex justify-between">
      {isAfterCurrentMonth() ? (
        <button onClick={handlePrevMonth}>
          <PrevButton />
        </button>
      ) : (
        <div className="h-24 w-16" />
      )}
      <span className="text-black-100">
        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
      </span>
      <button onClick={handleNextMonth}>
        <NextButton />
      </button>
    </div>
  );
};

export default Header;
