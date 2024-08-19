import { getReservationSchedule } from '@/apis/myPage/schedule';
import { ReservationDashboardResponse, ReservationSchedule } from '@/apis/myPage/schedule.types';
import ReservationInfoModal from '@/components/common/ReservationInfoModal';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';

import DateCell from './dateCell';
import { DailyReservation } from './reservation.types';

const dayArr = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

type CalendarProps = {
  activityId?: string;
  reservations: ReservationDashboardResponse | null;
};

const Calendar: React.FC<CalendarProps> = ({ activityId, reservations }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DailyReservation | null>(null);
  const [scheduleData, setScheduleData] = useState<ReservationSchedule[]>([]);

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

  const handleDateClick = async (day: number) => {
    if (!activityId) {
      console.error('Activity ID is undefined');
      return;
    }

    const clickedDate = new Date(currentYear, currentMonth, day);
    const formattedDate = format(clickedDate, 'yyyy-MM-dd');
    const reservation = reservations?.find((res) => res.date === formattedDate);

    if (reservation) {
      setSelectedDate(reservation);
      setModalOpen(true);

      try {
        const data = await getReservationSchedule(activityId, formattedDate); // API 호출
        console.log('Fetched schedule data:', data); // 응답 데이터 로그
        setScheduleData(data); // 받아온 데이터 설정
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
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
                  const reservation = reservations?.find((res) => res.date === format(reservationDate, 'yyyy-MM-dd'));

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedDate && scheduleData.length > 0 && (
        <div className="fixed inset-0 z-20 md:absolute md:z-0 md:mt-50 lg:ml-auto lg:mr-0 lg:w-429">
          <ReservationInfoModal
            tabData={[
              {
                type: '신청',
                count: scheduleData.reduce((acc, schedule) => acc + schedule.count.pending, 0),
              },
              {
                type: '승인',
                count: scheduleData.reduce((acc, schedule) => acc + schedule.count.confirmed, 0),
              },
              {
                type: '거절',
                count: scheduleData.reduce((acc, schedule) => acc + schedule.count.declined, 0),
              },
            ]}
            dropdownOptions={scheduleData.map((schedule) => ({
              value: schedule.scheduleId.toString(),
              label: `${schedule.startTime} - ${schedule.endTime}`,
            }))}
            reservationDate={selectedDate.date}
            reservations={{
              신청: scheduleData.flatMap((schedule) =>
                Array(schedule.count.pending).fill({ name: '신청자', count: 1 }),
              ),
              승인: scheduleData.flatMap((schedule) =>
                Array(schedule.count.confirmed).fill({ name: '승인자', count: 1 }),
              ),
              거절: scheduleData.flatMap((schedule) =>
                Array(schedule.count.declined).fill({ name: '거절자', count: 1 }),
              ),
            }}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
