import Button from '@/components/common/Button';
import { useClickOutside } from '@/hooks/useClickOutside';
import Image from 'next/image';
import { useState } from 'react';

import DropDown from '../../Dropdown';

const CardFooter = ({
  text,
  status,
  imgSrc,
  buttonName,
  additionalClassNames,
  onButtonClick,
}: {
  text: string;
  status?: string;
  imgSrc?: string;
  buttonName?: string;
  additionalClassNames?: string;
  onButtonClick?: () => void;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleDropdownVisible = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleOptionClick = (label: string) => {
    console.log(label); // 여기에 드롭다운 메뉴 클릭 시 실행할 로직을 추가하세요
    setIsOpenMenu(false);
  };

  const modalRef = useClickOutside(handleDropdownVisible);

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
            onClick={onButtonClick}
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
              <div ref={modalRef}>
                <div className="absolute left-[-80px] top-full">
                  <DropDown classNames="h-max w-120">
                    <DropDown.Option handleOptionClick={handleOptionClick} label="수정하기" />
                    <DropDown.Option handleOptionClick={handleOptionClick} label="삭제하기" />
                  </DropDown>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const CardFooterType = (<CardFooter text="" />).type;

export default CardFooter;
