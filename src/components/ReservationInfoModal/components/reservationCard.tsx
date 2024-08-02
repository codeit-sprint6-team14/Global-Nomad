import Button from '@/components/Button';

import { TabType } from './tabButton';

type ReservationCardProps = {
  selectedTab: TabType;
  reservationName: string;
  reservationCount: number;
};

const ReservationCard = ({ selectedTab, reservationName, reservationCount }: ReservationCardProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-4 border">
      <div className="flex flex-col gap-6 pl-16 pt-8">
        <p className="text-lg-semibold text-gray-700">
          닉네임 <span className="text-lg-medium text-black">{reservationName}</span>
        </p>
        <p className="text-lg-semibold text-gray-700">
          인원 <span className="text-lg-medium text-black">{reservationCount}명</span>
        </p>
      </div>
      <div className="flex justify-end pb-8 pr-16">
        {selectedTab === '신청' ? (
          <div className="flex gap-8">
            <Button.Default className="h-38 w-82">확정하기</Button.Default>
            <Button.Default variant="secondary" className="h-38 w-82">
              거절하기
            </Button.Default>
          </div>
        ) : (
          <p
            className={`h-44 w-82 rounded-26 ${selectedTab === '확정' ? 'text-orange-200' : 'text-red-200'} bg-orange-100 py-10 text-center text-md-bold`}
          >
            {selectedTab === '확정' ? '예약 확정' : '예약 거절'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
