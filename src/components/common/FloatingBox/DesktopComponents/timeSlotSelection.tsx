import Button from '@/components/common/Button';
import { selectedDateAtom, selectedSlotAtom } from '@/store/activityDetailsAtom';
import { TimeSlot, TimeSlotSelectionProps } from '@/types/availableSchedulesTypes';
import { useAtomValue } from 'jotai';
import { memo, useEffect, useState } from 'react';

type TimeSlotWithSelected = TimeSlot & { isSelected: boolean };

const TimeSlotSelection = ({
  handleSlotSelect,
  availableSchedule,
  getSelectedDateSlots,
  currentDate,
}: TimeSlotSelectionProps) => {
  const [slots, setSlots] = useState<TimeSlotWithSelected[]>([]);
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedSlot = useAtomValue(selectedSlotAtom);

  useEffect(() => {
    const isMonthMatching = selectedDate?.getMonth() === currentDate.getMonth();
    if (!availableSchedule || !selectedDate) return;

    // 달력의 달과 스케줄의 달이 다르면 slot을 계산할 필요 없음
    // selectedDate context가 currentDate state에 비해 느리게 업데이트 되는 문제가 있어서 이렇게 처리함
    if (!isMonthMatching && availableSchedule.length > 0) return;

    const newSlots = getSelectedDateSlots(selectedDate, availableSchedule);
    const updatedSlots = newSlots.map((slot) => ({
      ...slot,
      // 슬롯 선택 여부를 slots state를 업데이트할때 추가 해 줌으로써
      // selectedSlot과 slots state의 달이 같지 않을 때를 방지
      isSelected: selectedSlot?.id === slot.id,
    }));

    setSlots(updatedSlots);
  }, [availableSchedule, selectedDate, currentDate, selectedSlot]);

  return (
    <div>
      <h3 className="mb-14 text-2lg-bold">예약 가능한 시간</h3>
      {!selectedDate && (
        <p className="mb-10 mt-24 text-center text-lg-medium">현재 예약 가능한 날짜와 시간이 없습니다.</p>
      )}
      <div className="mb-12 flex gap-12 overflow-x-auto border-b border-gray-300 pb-16 scrollbar-hide">
        {slots.map((slot, index) => (
          <Button.Category
            key={index}
            isActive={slot.isSelected}
            onClick={() => handleSlotSelect(slot)}
            className="h-46 w-117 rounded-8 text-lg-medium"
          >
            {slot.startTime}~{slot.endTime}
          </Button.Category>
        ))}
      </div>
    </div>
  );
};

export default memo(TimeSlotSelection);
