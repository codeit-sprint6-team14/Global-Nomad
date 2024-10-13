import Button from '@/components/common/Button';
import DropDown from '@/components/common/Dropdown';
import { useClickOutside } from '@/hooks/useClickOutside';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface CardFooterProps {
  text: string;
  status?: string;
  imgSrc?: string;
  buttonName?: string;
  additionalClassNames?: string;
  onButtonClick?: () => void;
  onDelete?: () => void;
  activityId?: string | string[] | undefined;
}

const CardFooter = ({
  text,
  status,
  imgSrc,
  buttonName,
  additionalClassNames,
  onButtonClick,
  onDelete,
  activityId,
}: CardFooterProps) => {
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleDropdownVisible = () => {
    setIsOpenMenu((prev) => !prev);
  };
  const modalRef = useClickOutside(handleDropdownVisible);

  const handleDeleteBUtton = () => {
    onDelete?.();
    setIsOpenMenu(false);
  };

  const handleModificationButton = () => {
    router.push(`regist-activity/${activityId}`);
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
                    <DropDown.Option handleOptionClick={handleModificationButton} label="수정하기" />
                    <DropDown.Option handleOptionClick={handleDeleteBUtton} label="삭제하기" />
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

export const CardFooterType = (
  <CardFooter
    text=""
    onDelete={function (): void {
      throw new Error('Function not implemented.');
    }}
    activityId={undefined}
  />
).type;

export default CardFooter;
