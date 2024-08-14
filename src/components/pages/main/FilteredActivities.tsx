import ActivityCards from './ActivityCards';
import { useRadioTab } from './RadioTab';
import { FilteredActivitiesProps } from './mainPage.type';

const FilteredActivities: React.FC<FilteredActivitiesProps> = ({ activities, currentPage, pageSize }) => {
  const { activeTab } = useRadioTab();

  const filteredActivities = activities.filter((activity) =>
    activeTab === '' ? true : activity.category === activeTab,
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex);

  return (
    <div className="flex w-1204 flex-wrap gap-24">
      {paginatedActivities.map((activity) => (
        <ActivityCards key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default FilteredActivities;
