import Button from '@/components/common/Button';
import Image from 'next/image';
import { useState } from 'react';

import DropDown from '../../Dropdown';

const CardFooter = ({
  text,
  status,
  imgSrc,
  buttonName,
  additionalClassNames,
}: {
  text: string;
  status?: string;
  imgSrc?: string;
  buttonName?: string;
  additionalClassNames?: string;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleDropdownVisible = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleOptionClick = (label: string) => {
    console.log(label); // 여기에 드롭다운 메뉴 클릭 시 실행할 로직을 추가하세요
    setIsOpenMenu(false);
  };

  return (
    <div className={`relative flex items-end justify-between ${additionalClassNames}`}>
      <div className="pt-7 text-lg-medium text-black md:pt-14 md:text-xl-medium lg:pt-21 lg:text-2xl-medium">
        {text}
      </div>
      <div>
        {buttonName && (
          <Button.Default
            className={`h-[32px] w-80 text-md-bold md:h-[40px] md:w-112 md:text-lg-bold lg:h-[43px] lg:w-144`}
            variant={status === 'pending' ? 'secondary' : 'primary'}
          >
            {buttonName}
          </Button.Default>
        )}
        {imgSrc && (
          <div className="relative">
            <div className="relative mr-6 h-32 w-32 cursor-pointer md:h-40 md:w-40" onClick={handleDropdownVisible}>
              <Image src={imgSrc} alt="케밥 버튼" fill />
            </div>
            {isOpenMenu && (
              <DropDown classNames="h-max w-120">
                <DropDown.Option className="" key="수정하기" handleOptionClick={handleOptionClick} label="수정하기" />
                <DropDown.Option className="" key="삭제하기" handleOptionClick={handleOptionClick} label="삭제하기" />
              </DropDown>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const CardFooterType = (<CardFooter text="" />).type;

export default CardFooter;
