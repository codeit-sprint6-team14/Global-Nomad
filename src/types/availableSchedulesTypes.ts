export interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  date: string;
  times: TimeSlot[];
}
