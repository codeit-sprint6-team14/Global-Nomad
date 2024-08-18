import { Schedule } from '@/types/regisActivity';

export interface AddActivityTimeSectionProps {
  onChange: (data: { currentSchedules: Schedule[]; scheduleIdsToRemove: number[]; schedulesToAdd: Schedule[] }) => void;
  error: boolean;
  initialSchedules: Schedule[];
}
