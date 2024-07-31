import { DAYS_OF_WEEK } from '@/constants/date';
import { CalendarBodyProps } from '@/types/calendarTypes';

const Body = ({ selectedDate, selectActivityDate, availableDates, calendarDates }: CalendarBodyProps) => {
  const isSameDate = (date: Date, activityDate?: Date | null) => {
    if (!activityDate) return false;
    return date.toDateString() === activityDate.toDateString();
  };

  const isActivityDate = (date: Date, availableDates: Date[]) => {
    return availableDates.some((activityDate) => isSameDate(date, activityDate));
  };

  const createCalendarTagClassName = (date: Date): string => {
    const isSelected = isSameDate(date, selectedDate);
    const isActivity = isActivityDate(date, availableDates);

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

  const createCalendarElement = (date: Date | null, index: number): JSX.Element => {
    if (!date) {
      return <td key={`empty-${index}`} className="h-32 w-35"></td>;
    }

    return (
      <td
        key={date.toDateString()}
        className={createCalendarTagClassName(date)}
        onClick={() => selectActivityDate(date)}
      >
        {date.getDate()}
      </td>
    );
  };

  const divideWeek = (dates: JSX.Element[]) => {
    return dates.reduce<JSX.Element[][]>((acc, date, i) => {
      if (i % 7 === 0) acc.push([date]);
      else acc[acc.length - 1].push(date);
      return acc;
    }, []);
  };

  const calendarElements = calendarDates.map(createCalendarElement);
  const calendarRows = divideWeek(calendarElements);

  return (
    <table className="w-full text-center">
      <thead className="h-32">
        <tr>
          {DAYS_OF_WEEK.map((day) => (
            <th key={day} className="text-md-bold text-gray-800">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="h-160">
        {calendarRows.map((row, index) => {
          return (
            <tr key={`week-${index}`} className="text-xs-semibold">
              {row}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Body;
