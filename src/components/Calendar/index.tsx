import { INITIAL_DATE } from '@/constants/date';
import { CalendarProps } from '@/types/calendarTypes';
import { useEffect, useState } from 'react';

import Body from './body';
import Header from './header';

const Calendar = ({ selectedDate, updateDateSelect, availableDates, updateMonthChange, className }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(INITIAL_DATE);
  const today = INITIAL_DATE;
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prevMonth >= currentMonthStart) {
      setCurrentMonth(prevMonth);
      updateMonthChange(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(nextMonth);
    updateMonthChange(nextMonth);
  };

  const hasActivityDate = (day: Date) => {
    return availableDates.some((schedule) => day.toDateString() === schedule.toDateString());
  };

  const isAfterCurrentMonth = (viewingMonth: Date, today: Date) => {
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const viewingMonthStart = new Date(viewingMonth.getFullYear(), viewingMonth.getMonth(), 1);
    return viewingMonthStart > currentMonthStart;
  };

  const selectActivityDate = (day: Date) => {
    if (hasActivityDate(day)) {
      updateDateSelect(day);
    }
  };

  const generateCalendarDates = (currentMonth: Date) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays = [];

    // 해당 월의 첫 날 이전의 빈 값 추가
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    // 해당 월의 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(new Date(year, month, day));
    }

    // 해당 월의 마지막 주의 빈 값 추가
    const remainingDays = 7 - (calendarDays.length % 7);
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        calendarDays.push(null);
      }
    }

    return calendarDays;
  };

  const calendarDates = generateCalendarDates(currentMonth);

  useEffect(() => {
    updateMonthChange(currentMonth);
  }, []);

  return (
    <div className={`w-304 rounded-8 border border-gray-300 px-27 pb-17 pt-15 ${className}`}>
      <Header
        currentMonth={currentMonth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        isAfterCurrentMonth={() => isAfterCurrentMonth(currentMonth, today)}
      />
      <Body
        selectedDate={selectedDate}
        selectActivityDate={selectActivityDate}
        availableDates={availableDates}
        calendarDates={calendarDates}
      />
    </div>
  );
};

export default Calendar;
