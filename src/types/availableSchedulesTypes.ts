export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  date: string;
  times: TimeSlot[];
}

export interface TimeSlotSelectionProps {
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  handleSlotSelect: (slot: TimeSlot) => void;
  availableSchedule: DaySchedule[];
  getSelectedDateSlots: (selectedDate: Date | null, schedules: DaySchedule[]) => TimeSlot[];
}
