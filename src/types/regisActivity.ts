export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

export interface TimeSlotItemProps {
  slot: TimeSlot;
  onDelete: () => void;
}
