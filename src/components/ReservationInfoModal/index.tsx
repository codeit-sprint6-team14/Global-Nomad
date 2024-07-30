'use client';

import Image from 'next/image';
import { useState } from 'react';

import ReservationCard from '../ReservationCard';

type TabType = '신청' | '확정' | '거절';

const ReservationInfoModal = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('신청');

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex w-429 flex-col justify-between rounded-24 border px-1 pb-24 pt-12">
      <div className="flex h-98 flex-col gap-16 px-24 py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-xl-bold">예약 정보</h1>
          <button type="button">
            <Image
              src="/images/icon-close.svg"
              alt="close"
              objectFit="contain"
              width={40}
              height={40}
            />
          </button>
        </div>
        <div className="flex gap-12">
          <button
            onClick={() => handleTabClick('신청')}
            className={`relative ${selectedTab === '신청' ? 'border-b-4 border-green-300 text-xl-semibold text-green-300' : 'text-xl-regular text-gray-800'}`}
          >
            신청 12
          </button>
          <button
            onClick={() => handleTabClick('확정')}
            className={`relative ${selectedTab === '확정' ? 'border-b-4 border-green-300 text-xl-semibold text-green-300' : 'text-xl-regular text-gray-800'}`}
          >
            확정 10
          </button>
          <button
            onClick={() => handleTabClick('거절')}
            className={`relative ${selectedTab === '거절' ? 'border-b-4 border-green-300 text-xl-semibold text-green-300' : 'text-xl-regular text-gray-800'}`}
          >
            거절 0
          </button>
        </div>
      </div>
      <div className="mt-4 border border-gray-300"></div>
      <div className="flex flex-col gap-24 px-24 py-24">
        <div className="flex flex-col gap-16">
          <h2 className="text-xl-semibold">예약 날짜</h2>
          <div className="flex flex-col gap-2">
            <span className="text-xl-regular text-black">2023년 2월 12일</span>
            <div>Dropdown</div>
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <h2 className="text-xl-semibold">예약 내역</h2>
          <div className="flex flex-col gap-14">
            {/* // TODO: 예약 내역 받아오기 map으로 구현할 것! */}
            <ReservationCard selectedTab={selectedTab} />
          </div>
        </div>
      </div>
      <div className="flex justify-between px-24">
        <h2 className="text-xl-semibold">예약 현황</h2>
        <p className="text-xl-semibold">
          <span className="text-xl-semibold text-blue-200">10</span>/10
        </p>
      </div>
    </div>
  );
};

export default ReservationInfoModal;
