import Button from '@/components/common/Button';
import { useRouter } from 'next/router';

import EmptyContent from '../ReservationList/emptyContent';
import MyActivityCardList from './myActivityCardList';

const ActivitySettingsContent = ({ isEmpty = false }) => {
  const router = useRouter();

  const handleRegistActivity = () => {
    router.push('/my-page/regist-activity');
  };

  return (
    <div>
      <div className={`mb-16 flex items-center justify-between md:mb-24 ${isEmpty ? 'mb-90 lg:mb-111' : ''}`}>
        <h1 className="text-3xl-bold">예약 내역</h1>
        <Button.Default onClick={handleRegistActivity} className="h-48 w-128 rounded-4">
          체험 등록하기
        </Button.Default>
      </div>
      {isEmpty ? (
        <div className="md:w-429 lg:w-792">
          <EmptyContent />
        </div>
      ) : (
        <MyActivityCardList />
      )}
    </div>
  );
};

export default ActivitySettingsContent;
