/* eslint-disable @typescript-eslint/no-unused-vars */
import { INITIAL_DATE } from '@/constants/date';
import availableSchedule from '@/mockData/availableSchedule';
import { DaySchedule, TimeSlot } from '@/types/availableSchedulesTypes';
import { useEffect, useState } from 'react';

import Button from '../Button';
import Calendar from '../Calendar';
import DesktopComponents from './DesktopComponents';

const Desktop = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(INITIAL_DATE);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const price = 10000;

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
    <section className="h-746 w-384 rounded-8 border border-gray-300 bg-white px-24 py-17 shadow-[0px_10px_30px_3px_rgba(5,16,55,0.15)]">
      <DesktopComponents.Header price={price} />
      <main>
        <h2 className="mb-16 text-xl-bold">날짜</h2>
        <Calendar
          selectedDate={selectedDate}
          updateDateSelect={updateDateSelect}
          availableDates={availableDates}
          updateMonthChange={updateMonthChange}
          className="mx-auto mb-16 h-241 pt-[11px]"
        />
        <DesktopComponents.TimeSlotSelection
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          handleSlotSelect={handleSlotSelect}
          availableSchedule={availableSchedule}
          getSelectedDateSlots={getSelectedDateSlots}
        />
      </main>
      <footer>
        <div className="mb-16 border-b border-gray-300 pb-24">
          <DesktopComponents.ParticipantCounter />
          <Button.Default className="h-56 w-336">예약하기</Button.Default>
        </div>
        <DesktopComponents.TotalPrice price={price} />
      </footer>
    </section>
  );
};

export default Desktop;
