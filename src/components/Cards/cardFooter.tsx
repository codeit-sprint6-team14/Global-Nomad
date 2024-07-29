import Button from '@/components/Button';
import Image from 'next/image';

// import { useState } from 'react';

// import DropDown from '../NavBar/dropDown';

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
  // const [isOpenMenu, setIsOpenMenu] = useState(false);

  // const handleMenuVisible = () => {
  //   setIsOpenMenu((prev) => !prev);
  // };

  return (
    <div
      className={`relative flex items-end justify-between ${additionalClassNames}`}
    >
      <div className="pt-7 text-lg-medium text-black md:pt-14 md:text-xl-medium lg:pt-21 lg:text-2xl-medium">
        {text}
      </div>
      <div>
        {buttonName && (
          <Button
            className={`h-[32px] w-80 text-md-bold md:h-[40px] md:w-112 md:text-lg-bold lg:h-[43px] lg:w-144`}
            variant={status === 'pending' ? 'secondary' : 'primary'}
          >
            {buttonName}
          </Button>
        )}
        {imgSrc && (
          <>
            <div className="relative mr-6 h-32 w-32 cursor-pointer md:h-40 md:w-40">
              <Image
                src={imgSrc}
                alt="케밥 버튼"
                fill
                // onClick={handleMenuVisible}
              />
            </div>
          </>
        )}
      </div>
      {/* {isOpenMenu && <DropDown />} */}
    </div>
  );
};

export const CardFooterType = (<CardFooter text="" />).type;

export default CardFooter;
