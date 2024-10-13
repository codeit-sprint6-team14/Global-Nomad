import { DropdownProps, Option } from '@/types/dropDownInputTypes';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import DropdownInputList from './dropdownInputList';

interface DropdownInputProps extends DropdownProps {
  defaultOptionColor?: string; // 추가: 기본 옵션 색상을 위한 prop
}

const DropdownInput = ({
  options,
  defaultOption,
  onSelect,
  onFocus,
  value,
  error,
  className = '',
  defaultOptionColor = 'text-gray-500', // 추가: 기본 색상은 회색
}: DropdownInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectedOption, setIsSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

    if (onFocus) {
      onFocus();
    }
  };

  const handleOptionClick = (option: Option) => {
    setIsSelectedOption(option);
    setIsOpen(false);

    if (onSelect) {
      onSelect(option);
    }
  };

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value);
    setIsSelectedOption(selectedOption || null);
  }, [value, options]);

  useEffect(() => {
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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`flex h-full w-full cursor-pointer items-center justify-between rounded-4 border border-gray-700 bg-white px-12 md:px-16 ${error ? 'errorBorder' : 'normalBorder'} ${isOpen ? 'border-green-300' : ''} ${className}`}
        onClick={toggleDropdown}
      >
        <span
          className={`${isSelectedOption ? 'text-black' : defaultOptionColor} max-w-[300px] truncate md:max-w-[600px] lg:max-w-[1200px]`}
        >
          {isSelectedOption ? isSelectedOption.label : defaultOption}
        </span>
        <span className={`transform transition-transform duration-200 ${isOpen && 'rotate-180'}`}>
          <Image src="/assets/icons/arrow-dropdown.svg" width={12} height={12} alt="dropdown button" />
        </span>
      </div>
      {isOpen && (
        <DropdownInputList options={options} selectedOption={isSelectedOption} onOptionClick={handleOptionClick} />
      )}
    </div>
  );
};

export default DropdownInput;
