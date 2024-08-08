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
}

const DateCell: React.FC<DateCellProps> = ({ day, isCurrentMonth, reservation }) => {
  return (
    <td
      className={`relative h-154 border text-left align-top text-xl-medium ${
        isCurrentMonth ? 'text-gray-700' : 'text-gray-400'
      }`}
    >
      <div className="flex flex-col">
        <span className="px-10 py-10 lg:px-15">{day}</span>
        {isCurrentMonth && reservation && (
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start p-1">
            {reservation.completed > 0 && <Chip type="completed" count={reservation.completed} />}
            {reservation.confirmed > 0 && <Chip type="confirmed" count={reservation.confirmed} />}
            {reservation.pending > 0 && <Chip type="pending" count={reservation.pending} />}
          </div>
        )}
      </div>
    </td>
  );
};

export default DateCell;
