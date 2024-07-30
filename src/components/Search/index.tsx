import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../Button';

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (value === '') setIsFocused(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <div className="box-shadow: 0px 4px 16px 0px #1122110D flex h-129 w-343 flex-col gap-15 rounded-16 border px-24 py-16 md:h-166 md:w-696 md:gap-20 md:py-32 lg:h-178 lg:w-1200 lg:gap-32">
      <label htmlFor="search" className="text-lg-bold md:text-xl-bold">
        무엇을 체험하고 싶으신가요?
      </label>
      <div className="flex h-56 w-295 items-center gap-16 md:w-648 md:gap-10 lg:w-1154">
        <div className="relative flex w-187 gap-10 md:w-500 lg:w-1004">
          <Image
            src="/images/icon-search.svg"
            alt="searchIcon"
            className="absolute left-3 top-[15%]"
            width={40}
            height={40}
          />
          <input
            type="text"
            id="search"
            name="search"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            placeholder=""
            className="h-56 w-full rounded-4 border border-gray-700 bg-white pl-[22%] text-md-regular placeholder-gray-400 focus:bg-white md:pl-[8%] lg:pl-[4%]"
          />
          <p
            className={`pointer-events-none absolute left-40 bg-white text-md-regular text-gray-600 transition-all duration-300 ${
              isFocused || value ? 'top-[-20%]' : 'top-15'
            }`}
          >
            내가 원하는 체험은
          </p>
        </div>
        <Button className="h-56 w-96 rounded-4 px-15 py-8 text-lg-bold md:w-136">
          검색하기
        </Button>
      </div>
    </div>
  );
};

export default Search;
