import { getActivities } from '@/apis/activities';
import DropDownList from '@/components/common/Dropdown/dropDownList';
import DropDownOption from '@/components/common/Dropdown/dropDownOption';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import DownArrow from '../../../../public/assets/icons/down-arrow.svg';
import FilteredActivities from './FilteredActivities';
import PopularActivityCard from './PopularActivityCard';
import { RadioTab } from './RadioTab';
import { Activity } from './mainPage.type';

const categories = ['문화·예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
const dropdownOptions = [
  { value: 'priceLow', label: '가격 낮은 순' },
  { value: 'priceHigh', label: '가격 높은 순' },
];

const MainPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const popularActivities = activities.filter((activity) => activity.rating >= 4.5);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await getActivities(page);
        setActivities((prevActivities) => [...prevActivities, ...response.activities]);
      } catch (error) {
        console.error('활동 목록을 불러오는 데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [page]);

  useEffect(() => {
    if (sortBy) {
      const sortedActivities = [...activities].sort((a, b) => {
        if (sortBy === 'priceLow') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      setActivities(sortedActivities);
    }
  }, [sortBy]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSortChnage = (value: string) => {
    setSortBy(value);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <section className="flex flex-col gap-24">
        <div className="flex justify-between">
          <h2>인기 체험</h2>
          <div className="flex justify-between gap-12">
            <button>{'<'}</button>
            <button>{'>'}</button>
          </div>
        </div>
        <div className="mb-48 flex h-384 w-1200 gap-24">
          {popularActivities.slice(0, 3).map((activity) => (
            <PopularActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-24">
        <div className="flex flex-col">
          <RadioTab.Root defaultTab="">
            <div className="mb-24 flex w-882 gap-24">
              {categories.map((category) => (
                <RadioTab.Item key={category} id={category}>
                  {category}
                </RadioTab.Item>
              ))}
              <div className="relative h-53 w-200 cursor-pointer rounded-15 border border-black-100" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex w-full items-center justify-center px-20 py-16 ${sortBy ? 'gap-5' : 'gap-40'}`}
                >
                  <span>{sortBy ? dropdownOptions.find((option) => option.value === sortBy)?.label : '가격'}</span>
                  <div className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                    <DownArrow alt="down arrow" />
                  </div>
                </button>
                {isDropdownOpen && (
                  <DropDownList classNames="shadow-[0px_4px_16px_0px_#1122110D] absolute top-full left-0 right-0 mt-6 flex flex-col border border-gray-300 rounded-tl-[6px] rounded-tr-[6px]">
                    {dropdownOptions.map((option) => (
                      <DropDownOption
                        key={option.value}
                        label={option.label}
                        handleOptionClick={() => handleSortChnage(option.value)}
                        className="text-2lg-medium text-gray-800"
                      />
                    ))}
                  </DropDownList>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-24">
              <h2>모든 체험</h2>
              <FilteredActivities activities={activities} />
            </div>
          </RadioTab.Root>
        </div>

        <div>pagination</div>

        {!loading && <button onClick={loadMore}>더 보기</button>}
        {loading && <p>로딩 중...</p>}
      </section>
    </>
  );
};

export default MainPage;
