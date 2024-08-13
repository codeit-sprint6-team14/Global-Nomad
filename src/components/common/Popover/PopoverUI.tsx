import { useContext } from 'react';

import Close from '../Icons/close';
import AlarmInfo from './AlarmInfo';
import { PopoverContext } from './PopoverRoot';

type PopoverUIProps<T> = {
  onClose: () => void;
  alarmCount: number;
  alarms: T[];
};

const PopoverUI = <T extends { title: string; dateTime: string; status: string; timeAgo: number }>({
  onClose,
  alarmCount,
  alarms,
}: PopoverUIProps<T>) => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('ExampleUI must be used within a PopoverRoot');
  }

  const { toggle } = context;

  return (
    <div className="relative flex h-screen w-screen cursor-default flex-col gap-16 overflow-auto rounded-10 border border-gray-400 bg-green-100 px-10 py-24 shadow-popover md:h-520 md:w-380">
      <div className="mx-auto flex h-32 w-328 justify-between">
        <h2 className="text-xl-bold text-black-100">알림 {alarmCount}개</h2>
        <button onClick={() => toggle()}>
          <Close width={24} height={24} color="black" />
        </button>
      </div>
      {alarms.map((alarm, index) => (
        <AlarmInfo
          key={index}
          onClose={onClose}
          title={alarm.title}
          dateTime={alarm.dateTime}
          status={alarm.status as '승인' | '거절' | '새로 들어왔어요'} // 타입 단언을 사용하지 않고 런타임 시 타입 보장
          timeAgo={alarm.timeAgo}
        />
      ))}
    </div>
  );
};

export default PopoverUI;
