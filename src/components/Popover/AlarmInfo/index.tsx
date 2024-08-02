import Close from '@/components/Icons/close';

type AlarmInfoProps = {
  onClose: () => void;
  title: string;
  dateTime: string;
  status: string;
  timeAgo: number;
};

const AlarmInfo = ({ onClose, title, dateTime, status, timeAgo }: AlarmInfoProps) => {
  return (
    <div className="flex w-328 flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-5 border border-gray-400 bg-white px-12 py-16">
        <div className="flex w-304 flex-col">
          <div className="relative flex justify-end">
            <p className="absolute left-0 top-[-15%] h-5 w-5">*</p>
            <button onClick={onClose}>
              <Close width={24} height={24} />
            </button>
          </div>
          <p className="text-md-regular text-black">
            {title}
            {dateTime} 예약이 <span>{status}</span>되었어요.
          </p>
        </div>
        <span className="text-xs-regular text-gray-600">{timeAgo}분 전</span>
      </div>
    </div>
  );
};

export default AlarmInfo;
