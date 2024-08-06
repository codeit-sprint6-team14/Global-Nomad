import DropDown from '@/components/common/Dropdown';
import Image from 'next/image';
import { useState } from 'react';

const Header = ({
  category,
  title,
  rating,
  reviewCount,
  address,
}: {
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleDropdownVisible = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleOptionClick = (label: string) => {
    console.log(label); // 여기에 드롭다운 메뉴 클릭 시 실행할 로직을 추가하세요
    setIsOpenDropdown(false);
  };

  return (
    <div className="px-16 pt-16 md:px-24 md:pt-24 lg:p-0">
      <div className="text-md-regular text-black-100">{category}</div>
      <div className="relative mt-10 flex items-center justify-between">
        <h1 className="text-2xl-bold text-black-100 md:text-3xl-bold">{title}</h1>
        <Image
          width={40}
          height={40}
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
        <Image className="mb-3" width={16} height={16} src="/assets/icons/star.svg" alt="별점 아이콘" />
        <div className="ml-6 text-md-regular text-black">{`${rating} (${reviewCount})`}</div>
        <Image className="ml-12" src="/assets/icons/map.svg" width={18} height={18} alt="지도 아이콘" />
        <div className="ml-2 text-md-regular text-black-100">{address}</div>
      </div>
    </div>
  );
};

export default Header;
