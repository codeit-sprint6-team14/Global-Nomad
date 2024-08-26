import EmptyContent from '../ReservationList/emptyContent';
import MyActivityCardList from './myActivityCardList';
import { ActivitySettingsContentProps } from './types/activitySettingsContent.types';

const ActivitySettingsContent = ({ activitiesData, isEmpty = false }: ActivitySettingsContentProps) => {
  return (
    <>
      {isEmpty ? (
        <div className="mb-420 md:mb-601 md:w-429 lg:mb-[469px] lg:w-792">
          <EmptyContent />
        </div>
      ) : (
        <MyActivityCardList activitiesData={activitiesData} />
      )}
    </>
  );
};

export default ActivitySettingsContent;
