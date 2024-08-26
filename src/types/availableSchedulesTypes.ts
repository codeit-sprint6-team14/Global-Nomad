export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  date: string;
  times: TimeSlot[];
}

export interface AvailableScheduleTypeProps {
  activityId: string;
  year: number;
  month: string;
}

export interface TimeSlotSelectionProps {
  handleSlotSelect: (slot: TimeSlot) => void;
  availableSchedule?: DaySchedule[];
  getSelectedDateSlots: (selectedDate: Date | null, schedules: DaySchedule[]) => TimeSlot[];
  currentDate: Date;
}
