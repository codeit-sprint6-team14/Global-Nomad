import DropDown from '@/components/common/Dropdown';
import { HeaderProps } from '@/types/activity';
import Image from 'next/image';
import { useState } from 'react';

const Header = ({ category, title, rating, reviewCount, address }: HeaderProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleDropdownVisible = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleOptionClick = (label: string) => {
    console.log(label); // 여기에 드롭다운 메뉴 클릭 시 실행할 로직을 추가하세요
    setIsOpenDropdown(false);
  };

  return (
    <div className="px-16 pt-87 md:px-24 md:pt-95 lg:p-0">
      <div className="text-md-regular text-black-100">{category}</div>
      <div className="relative mt-10 flex items-center justify-between">
        <h1 className="text-2xl-bold text-black-100 md:text-3xl-bold">{title}</h1>
        <Image
          width={40}
          height={40}
          style={{ width: 'auto' }}
          src="/assets/icons/kebab.svg"
          alt="케밥 아이콘"
          className="cursor-pointer"
          onClick={handleDropdownVisible}
        />
        {isOpenDropdown && (
          <DropDown classNames="h-max w-120 right-0 top-48 z-50 ">
            <DropDown.Option className="" key="수정하기" handleOptionClick={handleOptionClick} label="수정하기" />
            <DropDown.Option className="" key="삭제하기" handleOptionClick={handleOptionClick} label="삭제하기" />
          </DropDown>
        )}
      </div>
      <div className="mt-16 flex">
        <div className="relative mt-2 h-16 w-16">
          <Image fill src="/assets/icons/star.svg" alt="별점 아이콘" />
        </div>
        <div className="ml-6 text-md-regular text-black">{`${rating} (${reviewCount})`}</div>
        <div className="relative ml-12 mt-2 h-18 w-18">
          <Image src="/assets/icons/map.svg" fill alt="지도 아이콘" />
        </div>
        <div className="ml-2 text-md-regular text-black-100">{address}</div>
      </div>
    </div>
  );
};

export default Header;
