import { useContext } from 'react';

import Close from '../Icons/close';
import AlarmInfo from './AlarmInfo';
import { PopoverContext } from './PopoverRoot';

type PopoverUIProps = {
  onClose: () => void;
  alarmCount: number;
  alarms: Array<{ title: string; dateTime: string; status: string; timeAgo: number }>;
};

const PopoverUI = ({ onClose, alarmCount, alarms }: PopoverUIProps) => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('ExampleUI must be used within a PopoverRoot');
  }

  const { toggle } = context;

  return (
    <div className="flex w-368 flex-col gap-16 rounded-10 border border-gray-400 bg-green-100 px-20 py-24 shadow-popover">
      <div className="flex h-32 w-328 justify-between">
        <h2 className="text-xl-bold text-black-100">알림 {alarmCount}개</h2>
        <button onClick={toggle}>
          <Close width={24} height={24} color="black" />
        </button>
      </div>
      {/* // TODO: map으로 리스트 생성하여 알림 정보 렌더링*/}
      {alarms?.map((alarm, index) => <AlarmInfo key={index} onClose={onClose} {...alarm} />)}
    </div>
  );
};

export default PopoverUI;
