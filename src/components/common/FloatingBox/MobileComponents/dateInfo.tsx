interface DateInfoProps {
  date: string;
  startTime: string;
  endTime: string;
  scheduleId: boolean;
  handleOpenModal: () => void;
}

const DateInfo = ({ date, startTime, endTime, scheduleId, handleOpenModal }: DateInfoProps) => {
  return (
    <div>
      {scheduleId ? (
        <span className="text-md-semibold text-green-300">
          {date} {startTime} ~ {endTime}
        </span>
      ) : (
        <span
          onClick={handleOpenModal}
          className="cursor-pointer border-b border-green-300 text-md-semibold leading-[17px] text-green-300"
        >
          날짜 선택하기
        </span>
      )}
    </div>
  );
};

export default DateInfo;
