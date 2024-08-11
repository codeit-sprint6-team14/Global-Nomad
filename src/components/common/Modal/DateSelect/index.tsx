/* eslint-disable @typescript-eslint/no-unused-vars */
import { INITIAL_DATE } from '@/constants/date';
import { useActivityAvailableSchedule } from '@/hooks/useActivityAvailableSchedule';
import { activityIdAtom, formSubmitDataAtom } from '@/store/activityDetailsAtom';
import { DaySchedule, TimeSlot } from '@/types/availableSchedulesTypes';
import { useAtom, useAtomValue } from 'jotai';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

import Calendar from '../../Calendar';
import Footer from './footer';
import Header from './header';
import TimeSlotSelection from './timeSlotSelection';

const DateSelectModal = ({ setIsOpenModal }: { setIsOpenModal: Dispatch<SetStateAction<boolean>> }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(INITIAL_DATE);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formSubmitScheduleId, setFormSubmitScheduleId] = useAtom(formSubmitDataAtom);
  const activityId = useAtomValue(activityIdAtom); // 전역 activityId atom

  const twoDigitMonth = String(currentMonth.getMonth() + 1).padStart(2, '0');

  const { availableSchedule, isLoading, error } = useActivityAvailableSchedule({
    activityId,
    year: currentMonth.getFullYear(),
    month: twoDigitMonth,
  });

  INITIAL_DATE.setHours(0, 0, 0, 0);

  const availableDates =
    availableSchedule?.map((schedule) => new Date(schedule.date)).filter((date) => date >= INITIAL_DATE) || [];

  const getFirstActivityDateOfMonth = useCallback(
    (year: number, month: number) => {
      return (
        availableSchedule?.find((schedule) => {
          const scheduleDate = new Date(schedule.date);
          return (
            scheduleDate >= INITIAL_DATE && scheduleDate.getFullYear() === year && scheduleDate.getMonth() === month
          );
        })?.date || null
      );
    },
    [availableSchedule],
  );

  const getSelectedDateSlots = useCallback((selectedDate: Date | null, schedules?: DaySchedule[]) => {
    const selectedSchedule = schedules?.find(
      (schedule) => new Date(schedule.date).toDateString() === selectedDate?.toDateString(),
    );

    return selectedSchedule ? selectedSchedule.times : [];
  }, []);

  const getFirstSlotOfDate = useCallback(
    (date: Date | null) => {
      const slots = getSelectedDateSlots(date, availableSchedule);
      if (slots.length > 0) {
        const firstSlot = slots[0];
        setSelectedSlot(firstSlot);
        setFormSubmitScheduleId((prev) => ({ ...prev, scheduleId: firstSlot.id }));
      } else {
        setSelectedSlot(null);
      }
    },
    [availableSchedule, getSelectedDateSlots],
  );

  const updateDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    getFirstSlotOfDate(date);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setFormSubmitScheduleId((prev) => ({ ...prev, scheduleId: slot.id }));
  };

  const updateMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  useEffect(() => {
    // 데이터가 없을 경우
    if (!availableSchedule) return;

    const firstActivityDate = getFirstActivityDateOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

    if (firstActivityDate) {
      updateDateSelect(new Date(firstActivityDate));
    } else {
      setSelectedDate(null);
      setSelectedSlot(null);
    }
  }, [availableSchedule]);

  const isReservationPossible = selectedDate !== null && selectedSlot !== null;

  return (
    <div className="absolute right-0 top-0 z-50 w-480 rounded-24 bg-white px-24 py-32">
      <Header setIsOpenModal={setIsOpenModal} />
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
