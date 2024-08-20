import DownArrow from '@/../public/assets/icons/down-arrow.svg';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useToggle } from '@/hooks/useToggle';
import React from 'react';

import DropDown from '../Dropdown';

interface FilterProps {
  content?: string;
  onOptionSelect: (status: string) => void;
  selectedOption: string | null;
}

const sortOptions = ['예약 신청', '예약 취소', '예약 승인', '예약 거절', '체험 완료'];

const statusMapping: { [key: string]: string } = {
  '예약 신청': 'pending',
  '예약 취소': 'canceled',
  '예약 승인': 'confirmed',
  '예약 거절': 'declined',
  '체험 완료': 'completed',
};

const Filter = ({ content = '필터', onOptionSelect, selectedOption }: FilterProps) => {
  const { current: isOpen, handleToggle } = useToggle(false);

  const handleOptionClick = (option: string) => {
    const status = statusMapping[option];
    onOptionSelect(status);
    handleToggle();
  };

  const handleOutsideClick = () => {
    if (isOpen) {
      handleToggle();
    }
  };

  const filterRef = useClickOutside(handleOutsideClick);

  const getDisplayOption = (status: string | null) => {
    if (!status) return content;

    return Object.keys(statusMapping).find((key) => statusMapping[key] === status) || content;
  };

  return (
    <div ref={filterRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`flex h-51 w-107 items-center justify-center gap-21 rounded-15 border border-green-300 bg-white text-green-300 md:h-53 md:w-160 md:gap-70 md:text-2lg-medium ${selectedOption ? 'md:gap-[30px]' : ''}`}
      >
        {getDisplayOption(selectedOption)}
        <DownArrow />
      </button>
      {isOpen && (
        <DropDown classNames="w-107 mt-6 md:w-160">
          {sortOptions.map((label) => (
            <DropDown.Option
              key={label}
              className="px-10 md:text-2lg-medium"
              handleOptionClick={() => handleOptionClick(label)}
              label={label}
            />
          ))}
        </DropDown>
      )}
    </div>
  );
};

export default Filter;
