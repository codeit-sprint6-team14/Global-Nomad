import Button from '@/components/common/Button';
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
    {!selectedDate && <p className="mt-34 text-center text-2lg-medium">현재 예약 가능한 날짜와 시간이 없습니다.</p>}
    <div className="flex gap-12 overflow-x-auto scrollbar-hide">
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
