import { getReservations } from '@/apis/myPage/schedule';
import { ReservationScheduleArray } from '@/apis/myPage/schedule.types';
import { useClickOutside } from '@/hooks/useClickOutside';
import { reservationsAtom } from '@/store/reservationsAtom';
import { Option } from '@/types/dropDownInputTypes';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';

import Close from '../Icons/close';
import Input from '../Input';
import ReservationCard from './components/reservationCard';
import TabButtons, { TabType } from './components/tabButton';

type ReservationInfoModalProps = {
  activityId: number;
  schedules: ReservationScheduleArray;
  onClose: () => void;
};

const ReservationInfoModal = ({ activityId, schedules, onClose }: ReservationInfoModalProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('신청');
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [reservations, setReservations] = useAtom(reservationsAtom);
  const modalRef = useClickOutside(onClose); // 외부 클릭 시 onClose 호출

  const dropdownOptions = useMemo<Option[]>(
    () =>
      schedules.map((schedule) => ({
        value: schedule.scheduleId.toString(),
        label: `${schedule.startTime} - ${schedule.endTime}`,
      })),
    [schedules],
  );

  // tabData 계산을 reservations 상태에 따라 동적으로 계산
  const tabData = useMemo(
    () => [
      { type: '신청' as const, count: reservations.신청.length },
      { type: '승인' as const, count: reservations.승인.length },
      { type: '거절' as const, count: reservations.거절.length },
    ],
    [reservations], // reservations 상태가 변경될 때마다 재계산
  );

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
  };

  const handleDropdownSelect = (option: Option) => {
    setSelectedScheduleId(parseInt(option.value));
  };

  const handleUpdateReservation = (reservationId: number, status: 'confirmed' | 'declined') => {
    setReservations((prevReservations) => {
      const updatedReservations = { ...prevReservations };
      const targetReservation = updatedReservations[selectedTab].find((res) => res.id === reservationId);

      if (targetReservation) {
        // 선택한 예약을 '신청' 목록에서 제거
        updatedReservations[selectedTab] = updatedReservations[selectedTab].filter((res) => res.id !== reservationId);

        // 승인일 경우 해당 예약을 '승인'으로, 거절일 경우 '거절'로 이동
        if (status === 'confirmed') {
          updatedReservations.승인.push(targetReservation);

          // 나머지 예약들을 모두 '거절'로 이동
          updatedReservations.신청.forEach((res) => {
            updatedReservations.거절.push(res);
          });

          // '신청' 목록을 비웁니다.
          updatedReservations.신청 = [];
        } else if (status === 'declined') {
          updatedReservations.거절.push(targetReservation);
        }
      }

      return updatedReservations;
    });
  };

  const currentReservations = useMemo(() => reservations[selectedTab], [reservations, selectedTab]);

  // 총 예약 건수: '신청' 탭의 예약 건수로 계산
  const totalReservationCount = useMemo(() => tabData.find((tab) => tab.type === '신청')?.count || 0, [tabData]);

  useEffect(() => {
    if (selectedScheduleId) {
      const fetchReservations = async () => {
        try {
          const 신청 = await getReservations(activityId, selectedScheduleId, 'pending');
          const 승인 = await getReservations(activityId, selectedScheduleId, 'confirmed');
          const 거절 = await getReservations(activityId, selectedScheduleId, 'declined');

          setReservations({
            신청: 신청.reservations.map((res) => ({
              id: res.id,
              activityId: res.activityId,
              name: res.nickname,
              count: res.headCount,
            })),
            승인: 승인.reservations.map((res) => ({
              id: res.id,
              activityId: res.activityId,
              name: res.nickname,
              count: res.headCount,
            })),
            거절: 거절.reservations.map((res) => ({
              id: res.id,
              activityId: res.activityId,
              name: res.nickname,
              count: res.headCount,
            })),
          });
        } catch (error) {
          console.error('Failed to fetch reservations:', error);
        }
      };
      fetchReservations();
    }
  }, [selectedScheduleId, activityId, setReservations]);

  useEffect(() => {
    if (dropdownOptions.length > 0) {
      setSelectedScheduleId(parseInt(dropdownOptions[0].value));
    }
  }, [dropdownOptions]);

  return (
    <div
      ref={modalRef}
      className="flex h-full min-h-80 w-full flex-col justify-between border bg-white px-1 pb-24 pt-12 md:h-582 md:w-429 md:rounded-24"
    >
      <div className="mx-auto w-400 flex-col">
        <div className="flex h-98 flex-col gap-16 px-24 py-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl-bold md:text-xl-bold">예약 정보</h2>
            <button type="button" onClick={onClose}>
              <Close width={40} height={40} />
            </button>
          </div>
          <TabButtons selectedTab={selectedTab} onTabClick={handleTabClick} />
        </div>
        <div className="mt-4 border border-gray-300"></div>
        <div className="flex flex-col gap-24 px-24 py-24">
          <div className="flex flex-col gap-16">
            <h2 className="text-xl-semibold">예약 시간</h2>
            <div className="flex flex-col gap-2">
              <Input.Dropdown
                options={dropdownOptions}
                defaultOption={dropdownOptions.length > 0 ? dropdownOptions[0].label : '시간 선택'}
                onSelect={handleDropdownSelect}
                className="h-56"
              />
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <h2 className="text-xl-semibold">총 예약 {totalReservationCount}건</h2>
            <div className="flex h-[calc(100vh-350px)] w-370 flex-col gap-16 overflow-y-auto md:h-250">
              {currentReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  selectedTab={selectedTab}
                  reservationId={reservation.id}
                  activityId={reservation.activityId}
                  reservationName={reservation.name}
                  reservationCount={reservation.count}
                  onUpdate={(status) => handleUpdateReservation(reservation.id, status)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationInfoModal;
