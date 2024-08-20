export interface Schedule {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface SchedulesItemProps {
  slot: Schedule;
  onDelete: () => void;
}
