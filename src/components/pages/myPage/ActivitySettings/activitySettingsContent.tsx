import Button from '@/components/common/Button';
import { useRouter } from 'next/router';

import EmptyContent from '../ReservationList/emptyContent';
import MyActivityCardList from './myActivityCardList';
import { ActivitySettingsContentProps } from './types/activitySettingsContent.types';

const ActivitySettingsContent = ({ activitiesData, isEmpty = false }: ActivitySettingsContentProps) => {
  const router = useRouter();

  const handleRegistActivity = () => {
    router.push('/my-page/regist-activity');
  };

  return (
    <div>
      <div className={`mb-16 flex items-center justify-between md:mb-24 ${isEmpty ? 'mb-90 lg:mb-111' : ''}`}>
        <h1 className="text-3xl-bold">내 체험 관리</h1>
        <Button.Default onClick={handleRegistActivity} className="h-48 w-128 rounded-4">
          체험 등록하기
        </Button.Default>
      </div>
      {isEmpty ? (
        <div className="mb-420 md:mb-601 md:w-429 lg:mb-[469px] lg:w-792">
          <EmptyContent />
        </div>
      ) : (
        <MyActivityCardList activitiesData={activitiesData} />
      )}
    </div>
  );
};

export default ActivitySettingsContent;
