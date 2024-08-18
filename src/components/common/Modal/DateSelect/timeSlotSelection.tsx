import Button from '@/components/common/Button';
import { TimeSlot, TimeSlotSelectionProps } from '@/types/availableSchedulesTypes';
import { useEffect, useState } from 'react';

const TimeSlotSelection = ({
  selectedDate,
  selectedSlot,
  handleSlotSelect,
  availableSchedule,
  getSelectedDateSlots,
}: TimeSlotSelectionProps) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (!availableSchedule || !selectedDate) return;

    const newSlots = getSelectedDateSlots(selectedDate, availableSchedule);

    setSlots(newSlots);
  }, [availableSchedule, selectedDate]);

  return (
    <div>
      <h3 className="mb-14 text-2lg-bold">예약 가능한 시간</h3>
      {!selectedDate && <p className="mt-34 text-center text-2lg-medium">현재 예약 가능한 날짜와 시간이 없습니다.</p>}
      <div className="flex gap-12 overflow-x-auto scrollbar-hide">
        {slots.map((slot, index) => (
          <Button.Category
            key={index}
            isActive={selectedSlot === slot}
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

export default TimeSlotSelection;
