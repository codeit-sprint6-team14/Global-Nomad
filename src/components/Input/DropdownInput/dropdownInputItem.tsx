import { Option } from '@/types/dropDownInputTypes';
import Image from 'next/image';
import React from 'react';

interface DropdownItemProps {
  option: Option;
  isSelected: boolean;
  onClick: () => void;
}

const DropdownItem = ({ option, isSelected, onClick }: DropdownItemProps) => (
  <li
    className={`m-5 flex cursor-pointer items-center rounded-4 p-8 ${
      isSelected ? 'bg-black-100 text-white' : 'hover:bg-black-100 hover:text-white'
    }`}
    onClick={onClick}
  >
    <div className="mx-8 w-14">
      {isSelected && <Image src="/images/icon-checked.svg" width={13} height={13} alt="checked icon" />}
    </div>
    <span>{option.label}</span>
  </li>
);

export default DropdownItem;
