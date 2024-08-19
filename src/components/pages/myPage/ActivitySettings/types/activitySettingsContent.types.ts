import { Activity } from '@/apis/myPage/myActivitySettings.types';

export interface ActivitySettingsContentProps {
  activitiesData: Activity[] | undefined;
  isEmpty?: boolean;
}
