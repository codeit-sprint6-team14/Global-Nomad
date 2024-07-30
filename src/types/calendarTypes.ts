type DateType = Date | null;

interface ActivityDates {
  availableDates: Date[];
}

export interface CalendarProps extends ActivityDates {
  selectedDate: DateType;
  updateDateSelect: (day: DateType) => void;
  updateMonthChange: (newMonth: Date) => void;
  className?: string;
}

export interface CalendarHeaderProps {
  currentMonth: Date;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  isAfterCurrentMonth: () => boolean;
}

export interface CalendarBodyProps extends ActivityDates {
  selectedDate: DateType;
  selectActivityDate: (day: Date) => void;
  calendarDates: DateType[];
}
