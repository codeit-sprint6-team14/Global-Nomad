import { deleteNotification, getNotifications } from '@/apis/notification';
import { Popover } from '@/components/common/Popover';
import PopoverUI from '@/components/common/Popover/PopoverUI';
import { useClickOutside } from '@/hooks/useClickOutside';
import { alarmsAtom, totalCountAtom } from '@/store/notificationAtom';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [alarms, setAlarms] = useAtom(alarmsAtom); // Jotai atom 사용
  const [totalCount, setTotalCount] = useAtom(totalCountAtom); // Jotai atom 사용
  const [cursorId, setCursorId] = useState<number | null>(1);

  const handleClose = () => setIsOpen(false);
  const popoverRef = useClickOutside(handleClose);

  const getTimeAgo = (createdAt: string): string => {
    const now = Date.now();
    const diffInMs = now - new Date(createdAt).getTime();

    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  };

  const transformedAlarms = alarms.map((alarm) => {
    const status = alarm.content.includes('승인')
      ? '승인'
      : alarm.content.includes('거절')
        ? '거절'
        : '새로 들어왔어요';

    return {
      id: alarm.id, // ID를 추가
      content: alarm.content,
      dateTime: new Date(alarm.createdAt).toLocaleString(),
      status,
      timeAgo: getTimeAgo(alarm.createdAt),
    };
  });

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await deleteNotification(notificationId);
      setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== notificationId));
      setTotalCount((prevCount) => prevCount - 1); // totalCount 감소
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  useEffect(() => {
    setPortalRoot(document.getElementById('notification-root'));
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        setAlarms(response.notifications);
        setCursorId(response.cursorId);
        setTotalCount(response.totalCount); // totalCount 업데이트
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen, cursorId]);

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
                <PopoverUI
                  alarmCount={totalCount}
                  alarms={transformedAlarms}
                  onDelete={handleDeleteNotification} // 삭제 콜백을 전달
                />
              </Popover.Content>
            </div>,
            portalRoot,
          )}
      </Popover.Root>
    </div>
  );
};

export default Notification;
