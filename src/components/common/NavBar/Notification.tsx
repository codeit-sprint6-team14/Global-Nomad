import { Popover } from '@/components/common/Popover';
import PopoverUI from '@/components/common/Popover/PopoverUI';
import Image from 'next/image';
import { useState } from 'react';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const alarms = [
    { title: '타입스크립트 강의', dateTime: '2024년 8월 2일 14:00', status: '승인', timeAgo: 5 },
    { title: '프로젝트 강의', dateTime: '2024년 8월 1일 09:30', status: '거절', timeAgo: 10 },
    { title: '커리어 강의', dateTime: '2024년 8월 2일 11:00', status: '새로 들어왔어요', timeAgo: 15 },
  ];

  const handleClose = () => setIsOpen(false);

  return (
    <div className="relative">
      <Popover.Root>
        <Popover.Trigger>
          <Image
            src="/assets/icons/bell.svg"
            alt="네비바 알림 벨"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)} // 클릭 시 팝오버 열림
          />
        </Popover.Trigger>
        <div className="absolute right-0 top-50">
          {isOpen && (
            <Popover.Content>
              <PopoverUI onClose={handleClose} alarmCount={alarms.length} alarms={alarms} />
            </Popover.Content>
          )}
        </div>
      </Popover.Root>
    </div>
  );
};

export default Notification;
