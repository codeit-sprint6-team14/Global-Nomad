import { totalCountAtom } from '@/store/notificationAtom';
import { useAtom } from 'jotai';
import { useContext } from 'react';

import Close from '../Icons/close';
import AlarmInfo from './AlarmInfo';
import { PopoverContext } from './PopoverRoot';

type PopoverUIProps<T> = {
  alarmCount: number; // 여기에 추가
  alarms: T[];
  onDelete: (id: number) => void;
};

const PopoverUI = <T extends { id: number; content: string; dateTime: string; status: string; timeAgo: string }>({
  alarms,
  onDelete,
}: PopoverUIProps<T>) => {
  const [totalCount] = useAtom(totalCountAtom); // Jotai atom 구독
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('PopoverUI must be used within a PopoverRoot');
  }

  const { toggle } = context;

  return (
    <div className="relative flex h-screen w-screen cursor-default flex-col gap-16 overflow-auto rounded-10 border border-gray-400 bg-green-100 px-10 py-24 shadow-popover md:h-520 md:w-380">
      <div className="mx-auto flex h-32 w-328 justify-between">
        <h2 className="text-xl-bold text-black-100">알림 {totalCount}개</h2> {/* totalCount 직접 사용 */}
        <button onClick={() => toggle()}>
          <Close width={24} height={24} color="black" />
        </button>
      </div>
      {alarms.map((alarm, index) => (
        <AlarmInfo
          key={index}
          onDelete={() => onDelete(alarm.id)} // onDelete 콜백 호출
          content={alarm.content}
          status={alarm.status as '승인' | '거절' | '새로 들어왔어요'}
          timeAgo={alarm.timeAgo}
        />
      ))}
    </div>
  );
};

export default PopoverUI;
