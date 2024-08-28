import { deleteNotification, getNotifications } from '@/apis/notification';
import { AlarmType } from '@/apis/notification.type';
import { Popover } from '@/components/common/Popover';
import PopoverUI from '@/components/common/Popover/PopoverUI';
import { useClickOutside } from '@/hooks/useClickOutside';
import { alarmsAtom, totalCountAtom } from '@/store/notificationAtom';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [alarms, setAlarms] = useAtom(alarmsAtom);
  const [totalCount, setTotalCount] = useAtom(totalCountAtom);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

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

  const transformedAlarms: AlarmType[] = useMemo(
    () =>
      alarms.map((alarm) => ({
        id: alarm.id,
        content: alarm.content,
        dateTime: new Date(alarm.createdAt).toLocaleString(),
        status: alarm.content.includes('승인') ? '승인' : alarm.content.includes('거절') ? '거절' : '새로 들어왔어요',
        timeAgo: getTimeAgo(alarm.createdAt),
      })),
    [alarms],
  );

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      await deleteNotification(notificationId);
      setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== notificationId));
      setTotalCount((prevCount) => prevCount - 1); // totalCount 감소
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const fetchNotifications = useCallback(
    async (initial = false) => {
      if (isLoading || (!hasMore && !initial)) return;

      setIsLoading(true);
      try {
        const response = await getNotifications({ cursorId: initial ? 0 : cursorId, size: 10 });

        if (response.notifications.length === 0) {
          setHasMore(false);
        } else {
          setAlarms((prevAlarms) => {
            const newAlarms = response.notifications.filter(
              (newAlarm) => !prevAlarms.some((alarm) => alarm.id === newAlarm.id),
            );
            return [...prevAlarms, ...newAlarms]; // 새로운 알림을 추가
          });
          setTotalCount(response.totalCount);
          setCursorId(response.cursorId);
          setHasMore(response.notifications.length === 10);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [cursorId, isLoading, hasMore],
  );

  useEffect(() => {
    setPortalRoot(document.getElementById('notification-root'));
  }, []);

  // 페이지 로드 시와 일정 간격마다 알림을 가져오기 위한 useEffect
  useEffect(() => {
    fetchNotifications(true); // 초기 알림 로드

    const intervalId = setInterval(() => {
      fetchNotifications(true); // 5분에 한 번씩 알림 호출
    }, 300000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isOpen && alarms.length === 0) {
      fetchNotifications();
    }
  }, [isOpen, alarms.length]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetchNotifications();
      }
    }
  }, [fetchNotifications]);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="relative">
      <Popover.Root>
        <Popover.Trigger>
          <div className="relative inline-block">
            <Image
              src="/assets/icons/bell.svg"
              alt="네비바 알림 벨"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            {totalCount > 0 && (
              <div
                className="absolute right-0 top-0 h-5 w-5 rounded-full bg-red-600"
                style={{
                  transform: 'translate(50%, -50%)',
                }}
              ></div>
            )}
          </div>
        </Popover.Trigger>
        {isOpen &&
          portalRoot &&
          createPortal(
            <div className="relative lg:mx-auto lg:w-1200">
              <div
                ref={popoverRef}
                className="absolute top-0 z-[9999] md:left-auto md:right-[490px] md:top-80 lg:right-[380px]"
              >
                <Popover.Content>
                  <PopoverUI
                    ref={containerRef}
                    alarmCount={totalCount}
                    alarms={transformedAlarms}
                    onDelete={handleDeleteNotification}
                    onScroll={handleScroll}
                  />
                </Popover.Content>
              </div>
            </div>,
            portalRoot,
          )}
      </Popover.Root>
    </div>
  );
};

export default Notification;
