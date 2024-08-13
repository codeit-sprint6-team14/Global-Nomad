/* eslint-disable @typescript-eslint/no-unused-vars */
import { INITIAL_DATE } from '@/constants/date';
import { useActivityAvailableSchedule } from '@/hooks/useActivityAvailableSchedule';
import { useActivityReservationMutation } from '@/hooks/useReservationMutation';
import { formSubmitDataAtom } from '@/store/activityDetailsAtom';
import { DaySchedule, TimeSlot } from '@/types/availableSchedulesTypes';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import Button from '../Button';
import Calendar from '../Calendar';
import DesktopComponents from './DesktopComponents';

const Desktop = ({ activityId }: { activityId: string }) => {
  const queryClient = useQueryClient();

  const [currentMonth, setCurrentMonth] = useState<Date>(INITIAL_DATE);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [formSubmitScheduleId, setFormSubmitScheduleId] = useAtom(formSubmitDataAtom);

  const twoDigitMonth = String(currentMonth.getMonth() + 1).padStart(2, '0');

  const { availableSchedule, isLoading, error } = useActivityAvailableSchedule({
    activityId,
    year: currentMonth.getFullYear(),
    month: twoDigitMonth,
  });

  const price = 10000;

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
    // 폼 데이터 업데이트 slot.id -> scheduleId
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

  const { submitReservation, isPending } = useActivityReservationMutation();

  const handleReservationFormSubmit = () => {
    submitReservation(activityId, formSubmitScheduleId);
  };

  return (
    <section className="sticky top-0 h-746 w-384 rounded-8 border border-gray-300 bg-white px-24 py-17 shadow-[0px_10px_30px_3px_rgba(5,16,55,0.15)]">
      <DesktopComponents.PriceInfo price={price} />
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
      <DesktopComponents.ParticipantCounter />
      <Button.Default className="h-56 w-336" onClick={handleReservationFormSubmit}>
        예약하기
      </Button.Default>
      <div className="mb-16 border-b border-gray-300 pb-24"></div>
      <DesktopComponents.TotalPrice price={price} />
    </section>
  );
};

export default Desktop;
