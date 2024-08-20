import { deleteActivity } from '@/apis/ActivityDetailsPage/deleteActivity';
import DropDown from '@/components/common/Dropdown';
import { HeaderProps } from '@/types/activity';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Header = ({ myId, userId, category, title, rating, reviewCount, address, activityId }: HeaderProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const router = useRouter();

  const handleDropdownVisible = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleOptionClick = async (option: string) => {
    if (option === '수정하기') {
      router.push(`/my-page/activity-settings`);
    }
    if (option === '삭제하기') {
      await deleteActivity(activityId);
    }
    setIsOpenDropdown(false);
  };

  return (
    <div className="px-16 pt-16 md:px-24 md:pt-24 lg:p-0">
      <div className="text-md-regular text-black-100">{category}</div>
      <div className="relative mt-10 flex items-center justify-between">
        <h1 className="text-2xl-bold text-black-100 md:text-3xl-bold">{title}</h1>
        {myId === userId && (
          <Image
            width={40}
            height={40}
            style={{ width: 'auto' }}
            src="/assets/icons/kebab.svg"
            alt="케밥 아이콘"
            className="cursor-pointer"
            onClick={handleDropdownVisible}
          />
        )}
        {isOpenDropdown && (
          <DropDown classNames="h-max w-120 right-0 top-48 z-50 ">
            <DropDown.Option
              className=""
              key="수정하기"
              handleOptionClick={() => handleOptionClick('수정하기')}
              label="수정하기"
            />
            <DropDown.Option
              className=""
              key="삭제하기"
              handleOptionClick={() => handleOptionClick('삭제하기')}
              label="삭제하기"
            />
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
