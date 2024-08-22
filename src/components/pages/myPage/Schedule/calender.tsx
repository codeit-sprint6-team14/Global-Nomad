import { getReservationSchedule } from '@/apis/myPage/schedule';
import { ReservationDashboardResponse, ReservationScheduleArray } from '@/apis/myPage/schedule.types';
import ReservationInfoModal from '@/components/common/ReservationInfoModal';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';

import DateCell from './dateCell';

const dayArr = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

type CalendarProps = {
  activityId?: number;
  reservations: ReservationDashboardResponse | null;
  onMonthChange: (year: number, month: number) => void;
};

const Calendar: React.FC<CalendarProps> = ({ activityId, reservations, onMonthChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // selectedDate는 이제 날짜 문자열만 사용
  const [selectedSchedules, setSelectedSchedules] = useState<ReservationScheduleArray>([]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentMonthStartDate = new Date(currentYear, currentMonth, 1);
  const currentMonthEndDate = new Date(currentYear, currentMonth + 1, 0);
  const prevMonthEndDate = new Date(currentYear, currentMonth, 0).getDate();
  const prevMonthStartDay = currentMonthStartDate.getDay();
  const prevMonthDates = Array.from(
    { length: prevMonthStartDay },
    (_, i) => prevMonthEndDate - prevMonthStartDay + i + 1,
  );
  const currentMonthDates = Array.from({ length: currentMonthEndDate.getDate() }, (_, i) => i + 1);
  const nextMonthStartDay = currentMonthEndDate.getDay();
  const remainingDates = 6 - nextMonthStartDay;
  const nextMonthDates = Array.from({ length: remainingDates }, (_, i) => i + 1);
  const days = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];

  useEffect(() => {
    onMonthChange(currentYear, currentMonth + 1);
  }, [currentYear, currentMonth, onMonthChange]);

  const handlePrevClick = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateClick = async (day: number) => {
    if (!activityId) {
      console.error('Activity ID is undefined');
      return;
    }

    const clickedDate = new Date(currentYear, currentMonth, day);
    const formattedDate = format(clickedDate, 'yyyy-MM-dd');
    const reservation = reservations?.find((res) => res.date === formattedDate);

    if (reservation) {
      try {
        const schedules = await getReservationSchedule(activityId, formattedDate);
        setSelectedSchedules(schedules);
        setSelectedDate(formattedDate);
        setModalOpen(true);
      } catch (error) {
        console.error('Failed to fetch reservation schedules:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="container relative mx-auto w-342 p-4 md:w-430 lg:w-800">
      <div className="mb-20 flex items-center justify-center gap-20 text-xl-bold">
        <button onClick={handlePrevClick}>&lt;&lt;</button>
        <div className="text-xl-bold">{format(currentDate, 'yyyy년 M월', { locale: ko })}</div>
        <button onClick={handleNextClick}>&gt;&gt;</button>
      </div>
      <div className="mb-12 grid grid-cols-7 text-sm-medium text-gray-600">
        {dayArr.map((day) => (
          <div key={day} className="flex items-center justify-center p-10">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-12 text-xl-bold">
        {days.map((day, index) => {
          const isPrevMonth = index < prevMonthStartDay;
          const isNextMonth = index >= prevMonthStartDay + currentMonthDates.length;
          const isCurrentMonth = !isPrevMonth && !isNextMonth;
          const date = isPrevMonth
            ? new Date(currentYear, currentMonth - 1, day)
            : isNextMonth
              ? new Date(currentYear, currentMonth + 1, day)
              : new Date(currentYear, currentMonth, day);

          const formattedDate = format(date, 'yyyy-MM-dd');
          const reservation = reservations?.find((res) => res.date === formattedDate);

          return (
            <DateCell
              key={index}
              day={day}
              isCurrentMonth={isCurrentMonth}
              reservation={reservation ? reservation.reservations : undefined}
              onClick={() => isCurrentMonth && reservation && handleDateClick(day)}
            />
          );
        })}
      </div>
      {isModalOpen && selectedDate && activityId && (
        <div className="fixed inset-0 z-20 md:absolute md:z-0 md:mt-50 lg:ml-auto lg:mr-0 lg:w-429">
          <ReservationInfoModal onClose={handleCloseModal} activityId={activityId} schedules={selectedSchedules} />
        </div>
      )}
    </div>
  );
};

export default Calendar;
