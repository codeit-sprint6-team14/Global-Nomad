import Icons from '../../Icons';
import CirclePoint from '../Point';

type AlarmInfoProps = {
  onDelete: () => void;
  content: string;
  status: '승인' | '거절' | '새로 들어왔어요';
  timeAgo: string;
};

const AlarmInfo = ({ onDelete, content, status, timeAgo }: AlarmInfoProps) => {
  // "승인" 또는 "거절"을 포함한 부분만 스타일을 변경
  const highlightedContent = content
    .replace(/승인/g, '<span class="text-blue-400">승인</span>')
    .replace(/거절/g, '<span class="text-red-200">거절</span>');

  const getStatusStyle = (status: '승인' | '거절' | '새로 들어왔어요') => {
    switch (status) {
      case '승인':
        return 'fill-blue-400';
      case '거절':
        return 'fill-red-200';
      case '새로 들어왔어요':
        return 'fill-green-200';
      default:
        return 'fill-black';
    }
  };

  const fillColor = getStatusStyle(status);

  return (
    <div className="mx-auto flex w-328 flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-5 border border-gray-400 bg-white px-12 py-16">
        <div className="flex w-304 flex-col">
          <div className="relative flex justify-end">
            <p className="absolute left-0 top-[15%] h-5 w-5">
              <CirclePoint color={fillColor} />
            </p>
            <button onClick={onDelete}>
              <Icons.Close width={24} height={24} color="black" />
            </button>
          </div>
          <p
            className="w-270 text-wrap text-md-regular text-black"
            dangerouslySetInnerHTML={{ __html: highlightedContent }} // 특수 HTML을 사용하여 텍스트에 스타일 적용
          />
        </div>
        <span className="text-xs-regular text-gray-600">{timeAgo}</span>
      </div>
    </div>
  );
};

export default AlarmInfo;
