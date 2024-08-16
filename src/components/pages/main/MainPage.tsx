import { getActivities } from '@/apis/activities';
import DropDownList from '@/components/common/Dropdown/dropDownList';
import DropDownOption from '@/components/common/Dropdown/dropDownOption';
import Pagination from '@/components/common/Pagination';
import { useCallback, useEffect, useRef, useState } from 'react';

import DownArrow from '../../../../public/assets/icons/down-arrow.svg';
import ActivityCards from './ActivityCards';
import PopularActivityCard from './PopularActivityCard';
import { RadioTab } from './RadioTab';
import { ActivitiesResponse, Activity } from './mainPage.type';

const categories = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
const dropdownOptions = [
  { value: 'priceLow', label: '가격 낮은순' },
  { value: 'priceHigh', label: '가격 높은순' },
];

const MainPage2 = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [popularActivities, setPopularActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const sortActivities = useCallback((activitiesToSort: Activity[], sortType: string | null) => {
    if (!sortType) return activitiesToSort;
    return [...activitiesToSort].sort((a, b) => {
      if (sortType === 'priceLow') {
        return a.price - b.price;
      } else if (sortType === 'priceHigh') {
        return b.price - a.price;
      }
      return 0;
    });
  }, []);

  const fetchPopularActivities = useCallback(async () => {
    try {
      const data: ActivitiesResponse = await getActivities(1, 100, null);
      const popular = data.activities.filter((activity) => activity.rating >= 2.0);
      setPopularActivities(popular);
    } catch (error) {
      console.error('Error fetching popular activities:', error);
    }
  }, []);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const data: ActivitiesResponse = await getActivities(page, 8, activeCategory);

      const sortedActivities = sortActivities(data.activities || [], sortBy);
      setActivities(sortedActivities);
      setTotalPages(Math.ceil(data.totalCount / 8));
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('활동 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [page, activeCategory, sortBy, sortActivities]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    fetchPopularActivities();
  }, [fetchPopularActivities]);

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

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setPage(1);
  }, []);

  const handleSortChange = useCallback(
    (option: string) => {
      setSortBy(option);
      setActivities((prevActivities) => sortActivities(prevActivities, option));
    },
    [sortActivities],
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex flex-col items-center gap-24">
      <section className="flex flex-col gap-24">
        {popularActivities.length > 0 && (
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">인기 체험</h2>
            <div className="flex gap-12">
              <button></button>
              <button></button>
            </div>
          </div>
        )}
        <div className="flex w-1200 gap-24">
          {popularActivities.map((activity) => (
            <PopularActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-24">
        <div className="mb-24 flex items-center justify-between">
          <RadioTab.Root defaultTab={activeCategory} onTabChange={handleCategoryChange}>
            <div className="flex w-882 gap-24">
              {categories.map((category) => (
                <RadioTab.Item key={category} id={category}>
                  {category}
                </RadioTab.Item>
              ))}
            </div>
          </RadioTab.Root>

          <div className="relative h-53 w-150 cursor-pointer rounded-15 border border-black-100" ref={dropdownRef}>
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
                    handleOptionClick={() => {
                      handleSortChange(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className="text-2lg-medium text-gray-800"
                  />
                ))}
              </DropDownList>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-24">
          <h2>모든 체험</h2>
          <div className="flex w-1204 flex-wrap gap-24">
            {activities.map((activity) => (
              <ActivityCards key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isPlaceholderData={loading}
        />
      </section>
    </main>
  );
};

export default MainPage2;
