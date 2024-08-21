import { getNotifications } from '@/apis/notification';
import { NotificationType } from '@/apis/notification.type';
import { Popover } from '@/components/common/Popover';
import PopoverUI from '@/components/common/Popover/PopoverUI';
import { useClickOutside } from '@/hooks/useClickOutside';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [alarms, setAlarms] = useState<NotificationType[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(0);
  const [totalCount, setTotalCount] = useState(0);

  const handleClose = () => setIsOpen(false);
  const popoverRef = useClickOutside(handleClose);

  useEffect(() => {
    setPortalRoot(document.getElementById('notification-root'));
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        setAlarms(response.notifications);
        setCursorId(response.cursorId);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, cursorId]);

  const transformedAlarms = alarms.map((alarm) => {
    // content에서 "승인" 또는 "거절" 추출
    const status = alarm.content.includes('승인')
      ? '승인'
      : alarm.content.includes('거절')
        ? '거절'
        : '새로 들어왔어요';

    return {
      content: alarm.content,
      dateTime: new Date(alarm.createdAt).toLocaleString(),
      status, // 추출한 상태를 추가
      timeAgo: Math.floor((Date.now() - new Date(alarm.createdAt).getTime()) / 60000),
    };
  });

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
            onClick={() => setIsOpen(true)}
          />
        </Popover.Trigger>
        {isOpen &&
          portalRoot &&
          createPortal(
            <div ref={popoverRef} className="fixed left-0 top-0 z-[9999] md:left-auto md:right-[450px] md:top-80">
              <Popover.Content>
                <PopoverUI onClose={handleClose} alarmCount={totalCount} alarms={transformedAlarms} />
              </Popover.Content>
            </div>,
            portalRoot,
          )}
      </Popover.Root>
    </div>
  );
};

export default Notification;
