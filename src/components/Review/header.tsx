import Image from 'next/image';
import React from 'react';

type reviewDataProps = {
  title: string;
  bannerImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
};

const Header = ({
  title,
  bannerImageUrl,
  date,
  startTime,
  endTime,
  totalPrice = 10000,
  headCount,
}: reviewDataProps) => {
  return (
    <>
      <div className="flex w-full justify-between py-35">
        <h1 className="font-bold sm:text-28 md:text-2xl-bold">후기 작성</h1>
        <Image src="/images/icon-close.svg" alt="close" width={40} height={40} className="cursor-pointer" />
      </div>
      <div className="flex sm:gap-8 md:gap-24">
        <div className="relative sm:h-100 sm:w-100 md:h-126 md:w-126">
          <Image src={bannerImageUrl} fill alt="card image" className="absolute rounded-12" />
        </div>
        <div className="flex grow flex-col justify-between">
          <h3 className="sm:text-lg-bold md:text-xl-bold">{title}</h3>
          <p className="sm:text-md-regular md:text-2lg-regular">
            {date} · {startTime} - {endTime} · {headCount}명
          </p>
          <hr />
          <p className="sm:text-xl-bold md:text-3xl-bold">&#8361; {totalPrice.toLocaleString('ko-KR')}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
