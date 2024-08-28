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

  const tabData = useMemo(
    () => [
      { type: '신청' as const, count: schedules.reduce((sum, schedule) => sum + schedule.count.pending, 0) },
      { type: '승인' as const, count: schedules.reduce((sum, schedule) => sum + schedule.count.confirmed, 0) },
      { type: '거절' as const, count: schedules.reduce((sum, schedule) => sum + schedule.count.declined, 0) },
    ],
    [schedules],
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
        updatedReservations[selectedTab] = updatedReservations[selectedTab].filter((res) => res.id !== reservationId);
        updatedReservations[status === 'confirmed' ? '승인' : '거절'].push(targetReservation);
      }

      return updatedReservations;
    });
  };

  const currentReservations = useMemo(() => reservations[selectedTab], [reservations, selectedTab]);
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
          <div className="flex flex-col gap-16 overflow-auto">
            <h2 className="text-xl-semibold">총 예약 {totalReservationCount}건</h2>
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
  );
};

export default ReservationInfoModal;
