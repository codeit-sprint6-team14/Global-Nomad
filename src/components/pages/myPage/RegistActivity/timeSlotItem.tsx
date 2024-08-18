import Button from '@/components/common/Button';
import Icon from '@/components/common/Icons';
import { useDeviceState } from '@/hooks/useDeviceState';
import { Device } from '@/types/deviceTypes';
import { TimeSlotItemProps } from '@/types/regisActivity';

const renderSlotItem = (content: string, width: string) => {
  const commonStyles = 'flex h-44 items-center rounded-4 border border-gray-700 pl-12 md:pl-16 md:h-56';

  return (
    <div className={`${commonStyles} ${width}`}>
      <span className="text-md-regular md:text-lg-regular">{content}</span>
    </div>
  );
};

const TimeSlotItem = ({ slot, onDelete }: TimeSlotItemProps) => {
  const deviceState = useDeviceState();
  const isDesktop = deviceState === Device.DESKTOP;

  const dateSlot = renderSlotItem(slot.date, 'w-130 md:w-149 lg:w-379 lg:mr-20');
  const startTimeSlot = renderSlotItem(slot.startTime, 'w-79 md:w-104 lg:w-140');
  const endTimeSlot = renderSlotItem(slot.endTime, 'w-79 md:w-104 lg:w-140 lg:mr-20');

  return (
    <div className="mb-8 flex items-center gap-4 md:mb-16 lg:mb-21 lg:gap-0">
      {dateSlot}
      {isDesktop ? (
        <div className="flex items-center gap-12">
          {startTimeSlot}
          <span className="text-xl-bold">~</span>
          {endTimeSlot}
        </div>
      ) : (
        <>
          {startTimeSlot}
          {endTimeSlot}
        </>
      )}
      <Button.Default
        className="flex size-44 items-center justify-center border border-gray-300 bg-white md:size-56 md:rounded-9"
        onClick={onDelete}
      >
        <Icon.Subtract width="35" height="35" />
      </Button.Default>
    </div>
  );
};

export default TimeSlotItem;
