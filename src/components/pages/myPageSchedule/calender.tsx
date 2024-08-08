import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';

import DateCell from './dateCell';

interface DailyReservation {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

// Sample reservation data
const reservations: DailyReservation[] = [
  {
    date: '2024-08-09',
    reservations: {
      completed: 1,
      confirmed: 0,
      pending: 0,
    },
  },
  {
    date: '2024-08-15',
    reservations: {
      completed: 0,
      confirmed: 1,
      pending: 2,
    },
  },
];

const dayArr = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 현재 월의 첫 번째 날짜와 마지막 날짜 계산
  const currentMonthStartDate = new Date(currentYear, currentMonth, 1);
  const currentMonthEndDate = new Date(currentYear, currentMonth + 1, 0);

  // 이전 달의 시작 요일과 날짜 계산
  const prevMonthEndDate = new Date(currentYear, currentMonth, 0).getDate();
  const prevMonthStartDay = currentMonthStartDate.getDay();
  const prevMonthDates = Array.from(
    { length: prevMonthStartDay },
    (_, i) => prevMonthEndDate - prevMonthStartDay + i + 1,
  );

  // 현재 월의 날짜들 계산
  const currentMonthDates = Array.from({ length: currentMonthEndDate.getDate() }, (_, i) => i + 1);

  // 다음 달의 날짜들 계산
  const nextMonthStartDay = currentMonthEndDate.getDay();
  const remainingDates = 6 - nextMonthStartDay;
  const nextMonthDates = Array.from({ length: remainingDates }, (_, i) => i + 1);

  // 전체 날짜 배열
  const days = [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];

  const handlePrevClick = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  return (
    <div className="container mx-auto w-342 p-4 md:w-430 lg:w-800">
      <div className="mb-20 flex items-center justify-center gap-20 text-xl-bold">
        <button onClick={handlePrevClick}>&lt;&lt;</button>
        <div className="text-xl-bold">{format(currentDate, 'yyyy년 M월', { locale: ko })}</div>
        <button onClick={handleNextClick}>&gt;&gt;</button>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="min-w-full table-fixed">
          <colgroup>
            {dayArr.map((_, index) => (
              <col key={index} style={{ width: '14.28%' }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {dayArr.map((day, i) => (
                <th
                  key={i}
                  className="w-1/7 h-42 border px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, weekIdx) => (
              <tr key={weekIdx}>
                {days.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day, index) => {
                  let isCurrentMonth = false;
                  const dayIndex = weekIdx * 7 + index;

                  if (
                    dayIndex >= prevMonthDates.length &&
                    dayIndex < prevMonthDates.length + currentMonthDates.length
                  ) {
                    isCurrentMonth = true;
                  }

                  const reservationDate = new Date(currentYear, currentMonth, day);
                  const reservation = reservations.find((res) => res.date === format(reservationDate, 'yyyy-MM-dd'));

                  return (
                    <DateCell
                      key={index}
                      day={day}
                      isCurrentMonth={isCurrentMonth}
                      reservation={reservation ? reservation.reservations : undefined}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
