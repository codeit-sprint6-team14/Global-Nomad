import { useContext } from 'react';

import Close from '../Icons/close';
import AlarmInfo from './AlarmInfo';
import { PopoverContext } from './PopoverRoot';

type PopoverUIProps = {
  onClose: () => void;
};

const PopoverUI = ({ onClose }: PopoverUIProps) => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('ExampleUI must be used within a PopoverRoot');
  }

  const { toggle } = context;

  return (
    <div className="flex w-368 flex-col gap-16 rounded-10 border border-gray-400 bg-green-100 px-20 py-24 shadow-popover">
      <div className="flex h-32 w-328 justify-between">
        <h2 className="text-xl-bold text-black-100">알림 6개</h2>
        <button onClick={toggle}>
          <Close width={24} height={24} color="black" />
        </button>
      </div>
      {/* // TODO: map으로 리스트 생성하여 알림 정보 렌더링*/}
      <AlarmInfo onClose={onClose} />
    </div>
  );
};

export default PopoverUI;
