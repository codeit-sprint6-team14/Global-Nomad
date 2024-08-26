/* eslint-disable @typescript-eslint/no-unused-vars */
import { useActivityAvailableSchedule } from '@/apis/ActivityDetailsPage/getActivityAvailableSchedule';
import { INITIAL_DATE } from '@/constants/date';
import { activityIdAtom, scheduleIdAtom, selectedDateAtom, selectedSlotAtom } from '@/store/activityDetailsAtom';
import { DaySchedule, TimeSlot } from '@/types/availableSchedulesTypes';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

import Calendar from '../Calendar';
import TimeSlotSelection from '../FloatingBox/DesktopComponents/timeSlotSelection';

const ReservationScheduleSelect = () => {
  const [currentDate, setCurrentDate] = useState<Date>(INITIAL_DATE);

  const [selectedDate, setSelectedDate] = useAtom<Date | null>(selectedDateAtom);
  const [selectedSlot, setSelectedSlot] = useAtom(selectedSlotAtom);

  const setScheduleId = useSetAtom(scheduleIdAtom);

  const activityId = useAtomValue(activityIdAtom);

  const twoDigitMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

  const { availableSchedule, isLoading, error } = useActivityAvailableSchedule({
    activityId,
    year: currentDate.getFullYear(),
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

        setScheduleId(firstSlot.id);
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
    setScheduleId(slot.id);
    // 폼 데이터 업데이트 slot.id -> scheduleId
  };

  const updateMonthChange = (newMonth: Date) => {
    setCurrentDate(newMonth);
  };

  useEffect(() => {
    // 데이터가 없을 경우
    if (!availableSchedule) return;

    // 디바이스 사이즈가 바뀌어 달력이 새로 렌더링 됐을 시 사용자가 이미 선택한 날짜가 있으면 그 날짜로 달력 세팅
    if (currentDate === INITIAL_DATE && selectedDate) {
      setCurrentDate(selectedDate);
      updateDateSelect(selectedDate);
      return;
    }

    // 아직 사용자가 날짜를 선택하지 않았을 때 예약 가능한 가장 빠른 날짜와 시간을 자동으로 선택
    const firstActivityDate = getFirstActivityDateOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    if (firstActivityDate) {
      updateDateSelect(new Date(firstActivityDate));
    } else {
      setSelectedDate(null);
      setSelectedSlot(null);
    }
  }, [availableSchedule]);

  return (
    <div>
      <Calendar
        selectedDate={selectedDate}
        updateDateSelect={updateDateSelect}
        availableDates={availableDates}
        updateMonthChange={updateMonthChange}
        className="mx-auto mb-16 h-max pt-[11px]"
      />
      <TimeSlotSelection
        handleSlotSelect={handleSlotSelect}
        availableSchedule={availableSchedule}
        getSelectedDateSlots={getSelectedDateSlots}
        currentDate={currentDate}
      />
    </div>
  );
};

export default ReservationScheduleSelect;
