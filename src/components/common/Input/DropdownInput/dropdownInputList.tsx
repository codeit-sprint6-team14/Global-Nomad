import { Option } from '@/types/dropDownInputTypes';
import React from 'react';

import DropdownItem from './dropdownInputItem';

interface DropdownListProps {
  options: Option[];
  selectedOption: Option | null;
  onOptionClick: (option: Option) => void;
}

const DropdownList = ({ options, selectedOption, onOptionClick }: DropdownListProps) => (
  <ul className="absolute z-10 mt-8 w-full rounded-4 border bg-white text-black shadow-[0px_10px_30px_3px_rgba(5,16,55,0.15)]">
    {options.map((option) => (
      <DropdownItem
        key={option.value}
        option={option}
        isSelected={selectedOption?.value === option.value}
        onClick={() => onOptionClick(option)}
      />
    ))}
  </ul>
);

export default DropdownList;
