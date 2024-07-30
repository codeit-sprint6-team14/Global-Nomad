/* eslint-disable @typescript-eslint/no-unused-vars */
import { INITIAL_DATE } from '@/constants/date';
import availableSchedule from '@/mockData/availableSchedule';
import { DaySchedule, TimeSlot } from '@/types/availableSchedulesTypes';
import { useEffect, useState } from 'react';

import Button from '../Button';
import Calendar from '../Calendar';
import Icon from '../Icons';

const DateSelectModal = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(INITIAL_DATE);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  INITIAL_DATE.setHours(0, 0, 0, 0);
  const availableDates = availableSchedule
    .map((schedule) => new Date(schedule.date))
    .filter((date) => date >= INITIAL_DATE);

  const getFirstActivityDateOfMonth = (year: number, month: number) => {
    return (
      availableSchedule.find((schedule) => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate >= INITIAL_DATE && scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month;
      })?.date || null
    );
  };

  const getSelectedDateSlots = (selectedDate: Date | null, schedules: DaySchedule[]) => {
    const selectedSchedule = schedules.find(
      (schedule) => new Date(schedule.date).toDateString() === selectedDate?.toDateString(),
    );

    return selectedSchedule ? selectedSchedule.times : [];
  };

  const getFirstSlotOfDate = (date: Date | null) => {
    const slots = getSelectedDateSlots(date, availableSchedule);
    setSelectedSlot(slots.length > 0 ? slots[0] : null);
  };

  const updateDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    getFirstSlotOfDate(date);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const updateMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
    const firstActivityDate = getFirstActivityDateOfMonth(newMonth.getFullYear(), newMonth.getMonth());

    if (firstActivityDate) {
      updateDateSelect(new Date(firstActivityDate));
    } else {
      setSelectedDate(null);
      setSelectedSlot(null);
    }
  };

  const isReservationPossible = selectedDate !== null && selectedSlot !== null;

  useEffect(() => {
    const firstActivityDate = getFirstActivityDateOfMonth(INITIAL_DATE.getFullYear(), INITIAL_DATE.getMonth());

    if (firstActivityDate) {
      updateDateSelect(new Date(firstActivityDate));
    }
  }, []);

  return (
    <div className="w-480 rounded-24 bg-white px-24 py-32">
      <header className="mb-24 flex items-center justify-between">
        <h2 className="text-2xl-bold">날짜</h2>
        <button type="button">
          <Icon.Close width={40} height={40} />
        </button>
      </header>
      <main className="mb-64">
        <Calendar
          selectedDate={selectedDate}
          updateDateSelect={updateDateSelect}
          availableDates={availableDates}
          updateMonthChange={updateMonthChange}
          className="mx-auto mb-32"
        />
        <h3 className="mb-14 text-2lg-bold">예약 가능한 시간</h3>
        {!isReservationPossible && (
          <p className="mt-39 text-center text-lg">현재 예약 가능한 날짜와 시간이 없습니다.</p>
        )}
        <div className="flex gap-12 overflow-x-auto scrollbar-hide">
          {getSelectedDateSlots(selectedDate, availableSchedule).map((slot, index) => (
            <Button.Category
              key={index}
              isActive={selectedSlot === slot}
              onClick={() => handleSlotSelect(slot)}
              className="rounded-8 md:h-46 md:w-117 md:text-lg-medium"
            >
              {slot.startTime}~{slot.endTime}
            </Button.Category>
          ))}
        </div>
      </main>
      <footer>
        <Button disabled={!isReservationPossible} className="h-56 w-432">
          예약하기
        </Button>
      </footer>
    </div>
  );
};

export default DateSelectModal;
