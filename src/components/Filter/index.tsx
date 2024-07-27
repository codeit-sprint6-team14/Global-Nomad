/* eslint-disable react/function-component-definition */
import DownArrow from '@/../public/svgs/down-arrow.svg';
import { useState } from 'react';

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
        className="flex h-51 w-107 items-center justify-center gap-21 rounded-15 border border-green-300 bg-white text-green-300 md:h-53 md:w-160 md:gap-70"
      >
        가격
        <DownArrow />
      </button>
      {isOpen && (
        <ul className="absolute mt-8 h-82 w-107 rounded-6 bg-white shadow-lg ring-1 ring-black ring-opacity-5 md:w-160">
          <li className="border-b">
            <button
              type="button"
              className="h-41 w-full cursor-pointer text-sm-medium text-gray-800 hover:rounded-t-6 hover:bg-gray-200"
              onClick={handleOptionClick}
            >
              가격이 낮은 순
            </button>
          </li>
          <li>
            <button
              type="button"
              className="h-41 w-full cursor-pointer text-sm-medium text-gray-800 hover:rounded-b-6 hover:bg-gray-200"
              onClick={handleOptionClick}
            >
              가격이 높은 순
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Filter;
