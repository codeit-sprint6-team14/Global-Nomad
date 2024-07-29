import React from 'react';
import { DAYS_OF_WEEK } from '@/constants/date';
import { CalendarBodyProps } from '@/types/calendarTypes';

const Body = ({ selectedDate, selectActivityDate, availableDates, calendarDates }: CalendarBodyProps) => {
  const isSameDate = (date: Date, activityDate?: Date | null) => {
    if (!activityDate) return false;
    return date.toDateString() === activityDate.toDateString();
  };

  const isActivityDate = (day: Date, availableDates: Date[]) => {
    return availableDates.some((activityDate) => isSameDate(day, activityDate));
  };

  const createCalendarTagClassName = (day: Date): string => {
    const isSelected = isSameDate(day, selectedDate);
    const isActivity = isActivityDate(day, availableDates);

    let className = 'h-32 w-35 ';
    switch (true) {
      case isActivity && isSelected:
        className += 'cursor-pointer rounded-8 bg-green-300 text-white';
        break;
      case isActivity:
        className += 'cursor-pointer rounded-8 bg-green-100 text-green-300';
        break;
      default:
        className += 'text-gray-500';
    }

    return className;
  };

  const createCalendarElement = (day: Date | null, index: number): JSX.Element => {
    if (!day) {
      return <td key={index} className="h-32 w-35"></td>;
    }

    return (
      <td key={day.toDateString()} className={createCalendarTagClassName(day)} onClick={() => selectActivityDate(day)}>
        {day.getDate()}
      </td>
    );
  };

  const divideWeek = (days: JSX.Element[]) => {
    return days.reduce<JSX.Element[][]>((acc, day, i) => {
      if (i % 7 === 0) acc.push([day]);
      else acc[acc.length - 1].push(day);
      return acc;
    }, []);
  };

  const calendarElements = calendarDates.map(createCalendarElement);
  const calendarRows = divideWeek(calendarElements);

  return (
    <table className="w-full text-center">
      <thead className="h-32">
        <tr>
          {DAYS_OF_WEEK.map((day, i) => (
            <th key={i} className="text-md-bold text-gray-800">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="h-160">
        {calendarRows.map((row, index) => {
          return (
            <tr key={index} className="text-xs-semibold">
              {row}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Body;
