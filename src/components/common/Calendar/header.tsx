import NextButton from '@/../public/assets/icons/next-button.svg';
import PrevButton from '@/../public/assets/icons/prev-button.svg';
import { MONTHS } from '@/constants/date';
import { CalendarHeaderProps } from '@/types/calendarTypes';

const Header = ({ viewingMonth, handlePrevMonth, handleNextMonth, isViewingFutureMonth }: CalendarHeaderProps) => {
  return (
    <div className="flex justify-between">
      {isViewingFutureMonth() ? (
        <button onClick={handlePrevMonth}>
          <PrevButton />
        </button>
      ) : (
        <div className="h-24 w-16" />
      )}
      <span className="text-black-100">
        {MONTHS[viewingMonth.getMonth()]} {viewingMonth.getFullYear()}
      </span>
      <button onClick={handleNextMonth}>
        <NextButton />
      </button>
    </div>
  );
};

export default Header;
