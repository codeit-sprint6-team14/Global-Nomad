import Close from '../../Icons/close';
import CirclePoint from '../Point';

type AlarmInfoProps = {
  onClose: () => void;
  title: string;
  dateTime: string;
  status: '승인' | '거절' | '새로 들어왔어요';
  timeAgo: number;
};

const AlarmInfo = ({ onClose, title, dateTime, status, timeAgo }: AlarmInfoProps) => {
  const getStatusStyle = (status: '승인' | '거절' | '새로 들어왔어요') => {
    switch (status) {
      case '승인':
        return { color: 'fill-blue-400 text-blue-400', suffix: '되었어요' };
      case '거절':
        return { color: 'fill-red-200 text-red-200', suffix: '되었어요' };
      case '새로 들어왔어요':
        return { color: 'fill-green-200 text-green-200', suffix: '' };
      default:
        return { color: 'fill-black text-black', suffix: '' };
    }
  };

  const { color, suffix } = getStatusStyle(status);

  const [fillColor, textColor] = color.split(' ');

  return (
    <div className="mx-auto flex w-328 flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-5 border border-gray-400 bg-white px-12 py-16">
        <div className="flex w-304 flex-col">
          <div className="relative flex justify-end">
            <p className="absolute left-0 top-[15%] h-5 w-5">
              <CirclePoint color={fillColor} />
            </p>
            <button onClick={onClose}>
              <Close width={24} height={24} color="black" />
            </button>
          </div>
          <p className="w-270 text-wrap text-md-regular text-black">
            {title}({dateTime}) 예약이 <span className={textColor}>{status}</span>
            {suffix}.
          </p>
        </div>
        <span className="text-xs-regular text-gray-600">{timeAgo}분 전</span>
      </div>
    </div>
  );
};

export default AlarmInfo;
