import { INITIAL_DATE } from '@/constants/date';
import { CalendarProps } from '@/types/calendarTypes';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Body from './body';
import Header from './header';

const Calendar = ({ selectedDate, updateDateSelect, availableDates, updateMonthChange, className }: CalendarProps) => {
  const [viewingMonth, setViewingMonth] = useState<Date>(selectedDate || INITIAL_DATE);

  const today = useMemo(() => {
    const date = new Date(INITIAL_DATE);
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const handlePrevMonth = useCallback(() => {
    const prevMonth = new Date(viewingMonth.getFullYear(), viewingMonth.getMonth() - 1, 1);
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prevMonth >= currentMonthStart) {
      setViewingMonth(prevMonth);
      updateMonthChange(prevMonth);
    }
  }, [viewingMonth, today, updateMonthChange]);

  const handleNextMonth = useCallback(() => {
    const nextMonth = new Date(viewingMonth.getFullYear(), viewingMonth.getMonth() + 1, 1);
    setViewingMonth(nextMonth);
    updateMonthChange(nextMonth);
  }, [viewingMonth, updateMonthChange]);

  const isViewingFutureMonth = useCallback((viewingMonth: Date, today: Date) => {
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const viewingMonthStart = new Date(viewingMonth.getFullYear(), viewingMonth.getMonth(), 1);
    return viewingMonthStart > currentMonthStart;
  }, []);

  const generateCalendarDates = useCallback((viewingMonth: Date) => {
    const year = viewingMonth.getFullYear();
    const month = viewingMonth.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const calenderDates = [];

    for (let prevMonthDate = 0; prevMonthDate < firstDayOfWeek; prevMonthDate++) {
      calenderDates.push(null);
    }

    for (let date = 1; date <= lastDateOfMonth; date++) {
      calenderDates.push(new Date(year, month, date));
    }

    const remainingDays = 7 - (calenderDates.length % 7);
    if (remainingDays < 7) {
      for (let nextMonthDate = 0; nextMonthDate < remainingDays; nextMonthDate++) {
        calenderDates.push(null);
      }
    }

    return calenderDates;
  }, []);

  const hasActivityDate = useCallback(
    (date: Date) => availableDates.some((activityDate) => date.toDateString() === activityDate.toDateString()),
    [availableDates],
  );

  const selectActivityDate = useCallback(
    (date: Date) => {
      if (hasActivityDate(date)) {
        updateDateSelect(date);
      }
    },
    [hasActivityDate, updateDateSelect],
  );

  const calendarDates = useMemo(() => generateCalendarDates(viewingMonth), [viewingMonth, generateCalendarDates]);

  useEffect(() => {
    updateMonthChange(viewingMonth);
  }, []);

  return (
    <div className={`w-304 rounded-8 border border-gray-300 px-27 pb-17 pt-15 ${className}`}>
      <Header
        viewingMonth={viewingMonth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        isViewingFutureMonth={() => isViewingFutureMonth(viewingMonth, today)}
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
