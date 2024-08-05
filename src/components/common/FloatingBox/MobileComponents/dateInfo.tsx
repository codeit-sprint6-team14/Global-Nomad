interface DateInfoProps {
  date: string;
  startTime: string;
  endTime: string;
}

const DateInfo = ({ date, startTime, endTime }: DateInfoProps) => {
  return (
    <div>
      <span className="text-md-semibold text-green-300">
        {date} {startTime} ~ {endTime}
      </span>
    </div>
  );
};

export default DateInfo;
