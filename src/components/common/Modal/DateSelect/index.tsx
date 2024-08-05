/* eslint-disable @typescript-eslint/no-unused-vars */
import { INITIAL_DATE } from '@/constants/date';
import availableSchedule from '@/mockData/availableSchedule';
import { DaySchedule, TimeSlot } from '@/types/availableSchedulesTypes';
import { useEffect, useState } from 'react';

import Calendar from '../../Calendar';
import Footer from './footer';
import Header from './header';
import TimeSlotSelection from './timeSlotSelection';

const DateSelectModal = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(INITIAL_DATE);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const today = new Date(INITIAL_DATE);
  today.setHours(0, 0, 0, 0);

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
      <Header />
      <main className="mb-64">
        <Calendar
          selectedDate={selectedDate}
          updateDateSelect={updateDateSelect}
          availableDates={availableDates}
          updateMonthChange={updateMonthChange}
          className="mx-auto mb-32"
        />
        <TimeSlotSelection
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          handleSlotSelect={handleSlotSelect}
          availableSchedule={availableSchedule}
          getSelectedDateSlots={getSelectedDateSlots}
        />
      </main>
      <Footer isReservationPossible={isReservationPossible} />
    </div>
  );
};

export default DateSelectModal;
