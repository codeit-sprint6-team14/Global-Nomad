import { getActivities } from '@/apis/activities';
import DropDownList from '@/components/common/Dropdown/dropDownList';
import DropDownOption from '@/components/common/Dropdown/dropDownOption';
import React, { useEffect, useState } from 'react';

import DownArrow from '../../../../public/assets/icons/down-arrow.svg';
import FilteredActivities from './FilteredActivities';
import PopularActivityCard from './PopularActivityCard';
import { RadioTab } from './RadioTab';
import { Activity } from './mainPage.type';

const categories = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
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
              <div className="relative flex h-53 w-127 cursor-pointer items-center justify-between rounded-15 border border-black-100 px-20 py-16">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  {sortBy ? dropdownOptions.find((option) => option.value === sortBy)?.label : '가격'}
                </button>
                <DownArrow alt="down arrow" />
                {isDropdownOpen && (
                  <DropDownList classNames="flex flex-col">
                    {dropdownOptions.map((option) => (
                      <DropDownOption
                        key={option.value}
                        label={option.label}
                        handleOptionClick={() => handleSortChnage(option.value)}
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
