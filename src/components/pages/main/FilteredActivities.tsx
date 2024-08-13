import ActivityCards from './ActivityCards';
import { useRadioTab } from './RadioTab';
import { Activity } from './mainPage.type';

const FilteredActivities: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  const { activeTab } = useRadioTab();

  const filteredActivities = activities.filter((activity) =>
    activeTab === '' ? true : activity.category === activeTab,
  );

  return (
    <div className="flex w-1204 flex-wrap gap-24">
      {filteredActivities.slice(0, 8).map((activity) => (
        <ActivityCards key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default FilteredActivities;
