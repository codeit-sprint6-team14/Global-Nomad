/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icons';
import Input from '@/components/common/Input';
import { useDeviceState } from '@/hooks/useDeviceState';
import { dropdownTypeAtom } from '@/store/dropdownAtom';
import { Device } from '@/types/deviceTypes';
import { Schedule } from '@/types/regisActivity';
import { formatDateLocal } from '@/utils/formatDate';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

import ScheduleItem from './scheduleItem';
import { AddActivityTimeSectionProps } from './types/addActivityTimeSection.types';

const AddActivityTimeSection = ({ onChange, error, initialSchedules }: AddActivityTimeSectionProps) => {
  const [currentSchedules, setCurrentSchedules] = useState<Schedule[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [schedulesToAdd, setSchedulesToAdd] = useState<Schedule[]>([]);
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    date: '',
    startTime: '',
    endTime: '',
  });

  const deviceState = useDeviceState();
  const setDropdownType = useSetAtom(dropdownTypeAtom);
  const isDesktop = deviceState === Device.DESKTOP;

  const updateParent = () => {
    onChange({
      currentSchedules,
      scheduleIdsToRemove,
      schedulesToAdd,
    });
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    const timeString = `${hour}:00`;
    return { value: timeString, label: timeString };
  });

  const commonDropdownProps = {
    options: timeOptions,
    defaultOption: '00:00',
    onFocus: () => setDropdownType('time'),
    error: error && currentSchedules.length === 0,
  };

  const handleAddTimeSlot = () => {
    if (newSchedule.date && newSchedule.startTime && newSchedule.endTime) {
      setCurrentSchedules((prev) => [...prev, { ...newSchedule }]);
      setSchedulesToAdd((prev) => [...prev, { ...newSchedule }]);
      setNewSchedule({ date: '', startTime: '', endTime: '' });
      updateParent();
    }
  };

  const handleDeleteTimeSlot = (index: number) => {
    const scheduleToDelete = currentSchedules[index];

    if (scheduleToDelete.id) {
      setScheduleIdsToRemove((prev) => [...prev, scheduleToDelete.id as number]);
    } else {
      setSchedulesToAdd((prev) => prev.filter((schedule) => schedule !== scheduleToDelete));
    }
    setCurrentSchedules((prev) => prev.filter((_, i) => i !== index));
    updateParent();
  };

  useEffect(() => {
    updateParent();
  }, [currentSchedules, scheduleIdsToRemove, schedulesToAdd]);

  useEffect(() => {
    setCurrentSchedules(initialSchedules);
  }, [initialSchedules]);

  return (
    <div>
      <h2 className="mb-12 text-xl-bold md:mb-24 md:text-2xl-bold">예약 가능한 시간대</h2>
      <div className="mb-16 lg:mb-21">
        <div className="mb-8 flex gap-4 lg:gap-20">
          <div className="w-130 md:w-149 lg:w-379">
            <span className="text-lg-medium text-gray-800 md:text-xl-medium">날짜</span>
          </div>
          <div className="w-[79px] md:w-104 lg:mr-15 lg:w-140">
            <span className="text-lg-medium text-gray-800 md:text-xl-medium">시작 시간</span>
          </div>
          <div className="w-[79px] md:w-104 lg:w-140">
            <span className="text-lg-medium text-gray-800 md:text-xl-medium">종료 시간</span>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:gap-0">
          <Input.Date
            className={`text-md-regular md:text-lg-regular lg:mr-20 lg:w-379 ${error && 'errorBorder'}`}
            onChange={(newDate) =>
              setNewSchedule((prev) => ({ ...prev, date: newDate ? formatDateLocal(newDate) : '' }))
            }
            value={newSchedule.date}
          />
          {isDesktop ? (
            <div className="flex items-center gap-12">
              <Input.Dropdown
                {...commonDropdownProps}
                className={`h-44 w-79 text-md-regular md:h-56 md:w-104 md:text-lg-regular lg:w-140 ${error && 'errorBorder'}`}
                onSelect={(option) => setNewSchedule((prev) => ({ ...prev, startTime: option.value }))}
                value={newSchedule.startTime}
              />
              <span className="text-xl-bold">~</span>
              <Input.Dropdown
                {...commonDropdownProps}
                className={`h-44 w-79 text-md-regular md:h-56 md:w-104 md:text-lg-regular lg:mr-20 lg:w-140 ${error && 'errorBorder'}`}
                onSelect={(option) => setNewSchedule((prev) => ({ ...prev, endTime: option.value }))}
                value={newSchedule.endTime}
              />
            </div>
          ) : (
            <>
              <Input.Dropdown
                {...commonDropdownProps}
                className={`h-44 w-79 text-md-regular md:h-56 md:w-104 md:text-lg-regular lg:w-140 ${error && 'errorBorder'}`}
                onSelect={(option) => setNewSchedule((prev) => ({ ...prev, startTime: option.value }))}
                value={newSchedule.startTime}
              />
              <Input.Dropdown
                {...commonDropdownProps}
                className={`h-44 w-79 text-md-regular md:h-56 md:w-104 md:text-lg-regular lg:mr-20 lg:w-140 ${error && 'errorBorder'}`}
                onSelect={(option) => setNewSchedule((prev) => ({ ...prev, endTime: option.value }))}
                value={newSchedule.endTime}
              />
            </>
          )}
          <Button.Default
            onClick={handleAddTimeSlot}
            className="flex size-44 items-center justify-center bg-green-300 md:size-56 md:rounded-9"
          >
            <Icon.Plus width="35" height="35" fill="white" />
          </Button.Default>
        </div>
      </div>
      <div className="mb-16 w-full border border-gray-300 lg:mb-21" />
      {currentSchedules.map((schedule, index) => (
        <ScheduleItem key={schedule?.id} slot={schedule} onDelete={() => handleDeleteTimeSlot(index)} />
      ))}
    </div>
  );
};

export default AddActivityTimeSection;
