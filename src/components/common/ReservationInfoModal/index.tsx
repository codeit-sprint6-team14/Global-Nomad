import { useMemo, useState } from 'react';

import Close from '../Icons/close';
import Input from '../Input';
import ReservationCard from './components/reservationCard';
import TabButtons, { TabType } from './components/tabButton';

type ReservationData = {
  name: string;
  count: number;
};

type TabData = {
  type: TabType;
  count: number;
};

type ReservationInfoModalProps = {
  dropdownOptions: { value: string; label: string }[];
  tabData: TabData[];
  reservationDate: string;
  reservations: {
    신청: ReservationData[];
    확정: ReservationData[];
    거절: ReservationData[];
  };
};

const ReservationInfoModal = ({
  tabData,
  dropdownOptions,
  reservationDate,
  reservations = { 신청: [], 확정: [], 거절: [] },
}: ReservationInfoModalProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('신청');

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
  };

  const currentReservations = useMemo(() => reservations[selectedTab], [reservations, selectedTab]);
  const totalReservationCount = useMemo(() => tabData.find((tab) => tab.type === '신청')?.count || 0, [tabData]);

  return (
    <div className="flex w-429 flex-col justify-between rounded-24 border px-1 pb-24 pt-12 shadow-modal">
      <div className="flex h-98 flex-col gap-16 px-24 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-xl-bold">예약 정보</h1>
          <button type="button">
            <Close width={40} height={40} />
          </button>
        </div>
        <TabButtons tabData={tabData} selectedTab={selectedTab} onTabClick={handleTabClick} />
      </div>
      <div className="mt-4 border border-gray-300"></div>
      <div className="flex flex-col gap-24 px-24 py-24">
        <div className="flex flex-col gap-16">
          <h2 className="text-xl-semibold">예약 날짜</h2>
          <div className="flex flex-col gap-2">
            <span className="text-xl-regular text-black">{reservationDate}</span>
            <Input.Dropdown options={dropdownOptions} defaultOption="시간을 선택하세요" />
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <h2 className="text-xl-semibold">예약 내역</h2>
          <div className="flex flex-col gap-14">
            {currentReservations.map((reservation, index) => (
              <ReservationCard
                key={index}
                selectedTab={selectedTab}
                reservationName={reservation.name}
                reservationCount={reservation.count}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-24">
        <h2 className="text-xl-semibold">예약 현황</h2>
        <p className="text-xl-semibold">
          <span className="text-xl-semibold text-blue-200">{totalReservationCount}</span>/10
        </p>
      </div>
    </div>
  );
};

export default ReservationInfoModal;
