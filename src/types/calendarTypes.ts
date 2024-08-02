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
  viewingMonth: Date;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  isViewingFutureMonth: () => boolean;
}

export interface CalendarBodyProps extends ActivityDates {
  selectedDate: DateType;
  selectActivityDate: (day: Date) => void;
  calendarDates: DateType[];
}
