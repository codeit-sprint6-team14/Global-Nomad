/* eslint-disable @typescript-eslint/no-unused-vars */
import Icon from '@/components/common/Icons';
import { modalAtom } from '@/store/modalAtom';
import { reviewDataProps } from '@/types/reviewModalTypes';
import { useAtom } from 'jotai';
import Image from 'next/image';

const Header = ({ title, bannerImageUrl, date, startTime, endTime, totalPrice, headCount }: reviewDataProps) => {
  const [modalType, setModalType] = useAtom(modalAtom);

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    <>
      <div className="flex w-full justify-between py-35">
        <h1 className="font-bold sm:text-28 md:text-2xl-bold">후기 작성</h1>
        <button onClick={handleCloseModal}>
          <Icon.Close width={40} height={40} />
        </button>
      </div>
      <div className="flex sm:gap-8 md:gap-24">
        <div className="relative sm:h-100 sm:w-100 md:h-126 md:w-126">
          <Image src={bannerImageUrl} fill alt="card image" className="absolute rounded-12" />
        </div>
        <div className="flex grow flex-col justify-between">
          <h2 className="sm:text-lg-bold md:text-xl-bold">{title}</h2>
          <p className="sm:text-md-regular md:text-2lg-regular">
            {date} · {startTime} - {endTime} · {headCount}명
          </p>
          <hr />
          <p className="sm:text-xl-bold md:text-3xl-bold">&#8361; {totalPrice?.toLocaleString('ko-KR')}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
