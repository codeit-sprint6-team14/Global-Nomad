import { getActivities } from '@/apis/activities';
import DropDownList from '@/components/common/Dropdown/dropDownList';
import DropDownOption from '@/components/common/Dropdown/dropDownOption';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import DownArrow from '../../../../public/assets/icons/down-arrow.svg';
import PrevButton from '../../../../public/assets/icons/left-arrow.svg';
import NextButton from '../../../../public/assets/icons/right-arrow.svg';
import ActivityCards from './ActivityCards';
import PopularActivityCard from './PopularActivityCard';
import { RadioTab } from './RadioTab';
import { ActivitiesResponse, Activity } from './mainPage.type';

const categories = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
const dropdownOptions = [
  { value: 'priceLow', label: '가격 낮은순' },
  { value: 'priceHigh', label: '가격 높은순' },
];
const visibleCards = 3;

const MainPage = () => {
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
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex === popularActivities.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [popularActivities]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleCategoryChange = useCallback(
    (category: string) => {
      if (category === activeCategory) return;
      setActiveCategory(category);
      setPage(1);
    },
    [activeCategory],
  );

  const handleSortChange = useCallback(
    (option: string) => {
      setSortBy(option);
      setActivities((prevActivities) => sortActivities(prevActivities, option));
    },
    [sortActivities],
  );

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => Math.min(popularActivities.length - visibleCards, prevIndex + 1));
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className="flex flex-col items-center gap-24">
      {popularActivities.length > 0 && (
        <div className="relative h-[550px] w-full max-w-[1920px]">
          {popularActivities.map((activity, index) => (
            <Link
              key={activity.id}
              href={`/activities/${activity.id}`}
              className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${
                index === currentBannerIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={activity.bannerImageUrl}
                  alt={`Featured Activity Banner ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority={index === currentBannerIndex}
                  className="transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="mb-2 text-3xl font-bold">{activity.title}</h2>
                <p className="text-xl">\ {activity.price.toLocaleString()} /인</p>
              </div>
            </Link>
          ))}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2">
            {popularActivities.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === currentBannerIndex ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'
                }`}
                onClick={() => setCurrentBannerIndex(index)}
              />
            ))}
          </div>
        </div>
      )}

      <Search />

      <section className="flex flex-col gap-24">
        {popularActivities.length > 0 && (
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">인기 체험</h2>
            <div className="flex gap-12">
              <button onClick={handlePrevClick} disabled={startIndex === 0} className="cursor-pointer">
                <PrevButton />
              </button>
              <button
                onClick={handleNextClick}
                disabled={startIndex >= popularActivities.length - visibleCards}
                className="cursor-pointer"
              >
                <NextButton />
              </button>
            </div>
          </div>
        )}
        <div className="flex w-1200 gap-24">
          {popularActivities.map((activity, index) => (
            <PopularActivityCard key={activity.id} activity={activity} isHighlighted={index === currentBannerIndex} />
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

export default MainPage;
