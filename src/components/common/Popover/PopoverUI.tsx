import { totalCountAtom } from '@/store/notificationAtom';
import { useAtom } from 'jotai';
import React, { ForwardRefRenderFunction, forwardRef, useContext } from 'react';

import Close from '../Icons/close';
import AlarmInfo from './AlarmInfo';
import { PopoverContext } from './PopoverRoot';

type AlarmType = {
  id: number;
  content: string;
  dateTime: string;
  status: '승인' | '거절' | '새로 들어왔어요';
  timeAgo: string;
};

type PopoverUIProps = {
  alarmCount: number;
  alarms: AlarmType[];
  onDelete: (id: number) => void;
  onScroll: () => void;
};

const PopoverUI: ForwardRefRenderFunction<HTMLDivElement, PopoverUIProps> = ({ alarms, onDelete, onScroll }, ref) => {
  const [totalCount] = useAtom(totalCountAtom);
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('PopoverUI must be used within a PopoverRoot');
  }

  const { toggle } = context;

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className="relative flex h-screen w-screen cursor-default flex-col gap-16 overflow-auto rounded-10 border border-gray-400 bg-green-100 px-10 py-24 shadow-popover md:h-520 md:w-380"
    >
      <div className="mx-auto flex h-32 w-328 justify-between">
        <h2 className="text-xl-bold text-black-100">알림 {totalCount}개</h2>
        <button onClick={() => toggle()}>
          <Close width={24} height={24} color="black" />
        </button>
      </div>
      {alarms.map((alarm) => (
        <AlarmInfo
          key={alarm.id}
          onDelete={() => onDelete(alarm.id)}
          content={alarm.content}
          status={alarm.status}
          timeAgo={alarm.timeAgo}
        />
      ))}
    </div>
  );
};

export default forwardRef(PopoverUI);
