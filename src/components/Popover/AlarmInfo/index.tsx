import Image from 'next/image';

type AlarmInfoProps = {
  onClose: () => void;
};

const AlarmInfo = ({ onClose }: AlarmInfoProps) => {
  return (
    <div className="flex w-328 flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-5 border border-gray-400 bg-white px-12 py-16">
        <div className="flex w-304 flex-col">
          <div className="relative flex justify-end">
            <p className="absolute left-0 top-[-15%] h-5 w-5">*</p>
            <button onClick={onClose}>
              <Image src="/images/icon-close.svg" width={24} height={24} alt="close" />
            </button>
          </div>
          <p className="text-md-regular text-black">
            함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이 <span>승인</span>되었어요.
          </p>
        </div>
        <span className="text-xs-regular text-gray-600">1분 전</span>
      </div>
    </div>
  );
};

export default AlarmInfo;
