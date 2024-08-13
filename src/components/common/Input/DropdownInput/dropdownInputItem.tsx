import { dropdownTypeAtom } from '@/store/dropdownAtom';
import { Option } from '@/types/dropDownInputTypes';
import { useAtomValue } from 'jotai';
import Image from 'next/image';

interface DropdownItemProps {
  option: Option;
  isSelected: boolean;
  onClick: () => void;
}

const DropdownItem = ({ option, isSelected, onClick }: DropdownItemProps) => {
  const dropDownType = useAtomValue(dropdownTypeAtom);

  return (
    <li
      className={`m-5 flex cursor-pointer items-center rounded-4 p-8 ${
        isSelected ? 'bg-black-100 text-white' : 'hover:bg-black-100 hover:text-white'
      } ${dropDownType === 'time' && 'justify-center'}`}
      onClick={onClick}
    >
      {dropDownType === 'category' && (
        <div className="mx-8 w-14">
          {isSelected && <Image src="/assets/icons/checked.svg" width={13} height={13} alt="checked icon" />}
        </div>
      )}
      <span>{option.label}</span>
    </li>
  );
};

export default DropdownItem;
