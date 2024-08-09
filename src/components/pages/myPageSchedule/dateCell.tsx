import Chip from '@/components/common/Chip';
import React from 'react';

interface DateCellProps {
  day: number;
  isCurrentMonth: boolean;
  reservation?: {
    completed: number;
    confirmed: number;
    pending: number;
  };
  onClick: () => void;
}

const DateCell: React.FC<DateCellProps> = ({ day, isCurrentMonth, reservation, onClick }) => {
  const getCircleColor = () => {
    if (reservation) {
      if (reservation.completed > 0) {
        return 'bg-gray-800'; // 완료된 예약
      }
      if (reservation.confirmed > 0 && reservation.pending > 0) {
        return 'bg-blue-300'; // 승인 및 대기 중 예약
      }
      if (reservation.confirmed > 0) {
        return 'bg-orange-200'; // 승인된 예약
      }
      if (reservation.pending > 0) {
        return 'bg-blue-300'; // 대기 중인 예약
      }
    }
    return '';
  };

  const circleColor = getCircleColor();
  const isClickable = !!reservation;

  return (
    <td
      className={`relative h-154 border text-left align-top text-xl-medium ${
        isCurrentMonth ? 'text-gray-700' : 'text-gray-400'
      } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="h-full w-full">
        <div className="flex flex-col">
          <div className="items-top flex px-5 py-10 lg:px-15">
            <span>{day}</span>
            {circleColor && <span className={`ml-5 mt-4 h-7 w-7 rounded-full ${circleColor}`}></span>}
          </div>
          {isCurrentMonth && reservation && (
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start p-1">
              {reservation.completed > 0 && <Chip type="completed" count={reservation.completed} />}
              {reservation.confirmed > 0 && <Chip type="confirmed" count={reservation.confirmed} />}
              {reservation.pending > 0 && <Chip type="pending" count={reservation.pending} />}
            </div>
          )}
        </div>
      </div>
    </td>
  );
};

export default DateCell;
