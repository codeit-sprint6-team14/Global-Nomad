/* eslint-disable react/function-component-definition */
import DownArrow from '@/../public/assets/icons/down-arrow.svg';
import { useState } from 'react';

import DropDown from '../Dropdown';

const sortOptions = ['가격 낮은 순', '가격 높은 순'];

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDropDownToggle}
        className="flex h-51 w-107 items-center justify-center gap-21 rounded-15 border border-green-300 bg-white text-green-300 md:h-53 md:w-160 md:gap-70 md:text-2lg-medium"
      >
        가격
        <DownArrow />
      </button>
      {isOpen && (
        <DropDown classNames="w-107 mt-6 md:w-160">
          {sortOptions.map((label) => (
            <DropDown.Option
              key={label}
              className="px-10 md:text-2lg-medium"
              handleOptionClick={handleOptionClick}
              label={label}
            />
          ))}
        </DropDown>
      )}
    </div>
  );
};

export default Filter;
