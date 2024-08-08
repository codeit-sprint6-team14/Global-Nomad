import DownArrow from '@/../public/assets/icons/down-arrow.svg';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useToggle } from '@/hooks/useToggle';

import DropDown from '../Dropdown';

interface FilterProps {
  sortOptions: string[];
}

const Filter = ({ sortOptions }: FilterProps) => {
  const { current: isOpen, handleToggle } = useToggle(false);

  const handleOptionClick = () => {
    handleToggle();
  };

  const handleOutsideClick = () => {
    if (isOpen) {
      handleToggle();
    }
  };

  const filterRef = useClickOutside(handleOutsideClick);

  return (
    <div ref={filterRef}>
      <button
        type="button"
        onClick={handleToggle}
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
