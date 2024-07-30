import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type Option = {
  value: string;
  label: string;
};

interface CustomDropdownProps {
  options: Option[];
  defaultOption: string;
  onSelect?: (option: Option) => void;
}

const CustomDropdown = ({ options, defaultOption, onSelect }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectedOption, setIsSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 드롭다운 바깥 클릭시 드롭다운 닫힘
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setIsSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex h-56 w-full cursor-pointer items-center justify-between rounded-4 border border-gray-700 bg-white px-12"
        onClick={toggleDropdown}
      >
        <span className={`${isSelectedOption ? 'text-black' : 'text-gray-700'}`}>
          {isSelectedOption ? isSelectedOption.label : defaultOption}
        </span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <Image src="./images/icon-arrow-dropdown.svg" width={12} height={12} alt="dropdown button" />
        </span>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-8 w-full rounded-4 border bg-white text-black shadow-[0px_10px_30px_3px_rgba(5,16,55,0.15)]">
          {options.map((option) => (
            <li
              key={option.value}
              className={`m-5 flex cursor-pointer items-center rounded-4 p-8 ${
                isSelectedOption && isSelectedOption.value === option.value
                  ? 'bg-black-100 text-white'
                  : 'hover:bg-black-100 hover:text-white'
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <div className="mx-8 w-14">
                {isSelectedOption && isSelectedOption.value === option.value && (
                  <Image src="./images/icon-checked.svg" width={13} height={13} alt="checked icon" />
                )}
              </div>
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
