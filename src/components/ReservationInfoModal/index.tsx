import Image from 'next/image';

const ReservationInfoModal = () => {
  return (
    <div className="flex w-429 flex-col justify-between rounded-24 border px-1 pb-24 pt-12">
      <div className="flex h-98 flex-col gap-16 border-b px-24 pt-12">
        <div className="flex items-center justify-between">
          <h1>예약 정보</h1>
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
          <p>신청 12</p>
          <p>확정 10</p>
          <p>거절 0</p>
        </div>
      </div>
      <div className="flex flex-col gap-24 px-24 py-24">
        <h2>예약 날짜</h2>
        <div className="flex flex-col gap-2">
          <span>2023년 2월 12일</span>
          <div>Dropdown</div>
        </div>
        <div className="flex flex-col gap-16">
          <h2>예약 내역</h2>
          <div className="flex flex-col gap-6 rounded-4 border">
            <div className="flex flex-col gap-6 pl-16 pt-8">
              <span>닉네임 정만철</span>
              <span>인원 10명</span>
            </div>
            <div className="flex justify-end pb-8 pr-16">
              <p className="h-44 w-82 rounded-26 bg-gray-50 py-10 text-center text-md-bold">
                예약 확정
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-24">
        <h2>예약 현황</h2>
        <span>10/10</span>
      </div>
    </div>
  );
};

export default ReservationInfoModal;
