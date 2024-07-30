import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <>
      <div className="flex w-full justify-between py-35">
        <h1 className="font-bold sm:text-28 md:text-2xl-bold">후기 작성</h1>
        <Image
          src="./images/icon-close.svg"
          alt="close"
          width={40}
          height={40}
          className="cursor-pointer"
        />
      </div>
      <div className="flex sm:gap-8 md:gap-24">
        <div className="relative sm:h-100 sm:w-100 md:h-126 md:w-126">
          <Image
            src="/images/test-profile-img.png"
            fill
            alt="card image"
            className="absolute rounded-12"
          />
        </div>
        <div className="flex grow flex-col justify-between">
          <h3 className="sm:text-lg-bold md:text-xl-bold">
            함께 배우면 즐거운 스트릿 댄스
          </h3>
          <p className="sm:text-md-regular md:text-2lg-regular">
            2023. 2.14 · 11:00 - 12:30 · 10명
          </p>
          <hr />
          <p className="sm:text-xl-bold md:text-3xl-bold">&#8361;10,000</p>
        </div>
      </div>
    </>
  );
};

export default Header;
