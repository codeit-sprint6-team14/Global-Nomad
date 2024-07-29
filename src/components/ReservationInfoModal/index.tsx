'use client';

import Image from 'next/image';
import { useState } from 'react';

const ReservationInfoModal = () => {
  const [selectedTab, setSelectedTab] = useState('신청');

  const handleTabClick = (tab: string) => {
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
        <h2 className="text-xl-semibold">예약 날짜</h2>
        <div className="flex flex-col gap-2">
          <span className="text-xl-regular text-black">2023년 2월 12일</span>
          <div>Dropdown</div>
        </div>
        <div className="flex flex-col gap-16">
          <h2 className="text-xl-semibold">예약 내역</h2>
          <div className="flex flex-col gap-6 rounded-4 border">
            <div className="flex flex-col gap-6 pl-16 pt-8">
              <p className="text-lg-semibold text-gray-700">
                닉네임 <span className="text-lg-medium text-black">정만철</span>
              </p>
              <p className="text-lg-semibold text-gray-700">
                인원 <span className="text-lg-medium text-black">10명</span>
              </p>
            </div>
            <div className="flex justify-end pb-8 pr-16">
              <p className="h-44 w-82 rounded-26 bg-orange-100 py-10 text-center text-md-bold text-orange-200">
                예약 확정
              </p>
            </div>
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
