import Button from '@/components/Button';
import { TimeSlotSelectionProps } from '@/types/availableSchedulesTypes';

const TimeSlotSelection = ({
  selectedDate,
  selectedSlot,
  handleSlotSelect,
  availableSchedule,
  getSelectedDateSlots,
}: TimeSlotSelectionProps) => (
  <div>
    <h3 className="mb-14 text-2lg-bold">예약 가능한 시간</h3>
    {!selectedDate && <p className="mt-39 text-center text-lg">현재 예약 가능한 날짜와 시간이 없습니다.</p>}
    <div className="mb-12 flex gap-12 overflow-x-auto border-b border-gray-300 pb-16 scrollbar-hide">
      {getSelectedDateSlots(selectedDate, availableSchedule).map((slot, index) => (
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

export default TimeSlotSelection;
