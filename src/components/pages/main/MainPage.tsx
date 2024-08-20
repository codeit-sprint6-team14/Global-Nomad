import { getActivities, useActivities } from '@/apis/activities';
import DropDownList from '@/components/common/Dropdown/dropDownList';
import DropDownOption from '@/components/common/Dropdown/dropDownOption';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import DownArrow from '../../../../public/assets/icons/down-arrow.svg';
import PrevButton from '../../../../public/assets/icons/left-arrow.svg';
import NextButton from '../../../../public/assets/icons/right-arrow.svg';
import ActivityCards from './ActivityCards';
import PopularActivityCard from './PopularActivityCard';
import { RadioTab } from './RadioTab';

const categories = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
const dropdownOptions = [
  { value: 'priceLow', label: '가격 낮은순' },
  { value: 'priceHigh', label: '가격 높은순' },
];

const visibleCards = 3;
const INITIAL_ITEMS_PER_PAGE = 8;
const SEARCH_ITEMS_PER_PAGE = 16;

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(INITIAL_ITEMS_PER_PAGE);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useActivities(page, itemsPerPage, activeCategory, sortBy);
  const { data: popularActivitiesData, isLoading: isPopularActivitiesLoading } = useQuery({
    queryKey: ['popularActivities'],
    queryFn: async () => {
      const data = await getActivities(1, 100, null, null);
      return data.activities.filter((activity) => activity.rating >= 2.0);
    },
    placeholderData: [],
  });

  const displayedActivities = activitiesData?.activities || [];
  const popularActivities = popularActivitiesData || [];
  const totalPages = Math.ceil((activitiesData?.activities?.length ?? 0) / itemsPerPage);

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

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setPage(1);
    setIsSearching(false);
    setSearchTerm('');
    setItemsPerPage(INITIAL_ITEMS_PER_PAGE);
  }, []);

  const handleSortChange = useCallback((option: string) => {
    setSortBy(option);
  }, []);

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => Math.min(popularActivities.length - visibleCards, prevIndex + 1));
  };

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1);
    if (term) {
      setIsSearching(true);
      setItemsPerPage(SEARCH_ITEMS_PER_PAGE);
    } else {
      setIsSearching(false);
      setItemsPerPage(INITIAL_ITEMS_PER_PAGE);
    }
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const getCurrentMonth = () => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    return months[new Date().getMonth()];
  };

  if (isActivitiesLoading || isPopularActivitiesLoading) return <div>loading...</div>;
  if (activitiesError) return <div>{activitiesError.message}</div>;
  return (
    <main className="flex flex-col items-center bg-gray-100">
      <div className="relative w-full">
        {popularActivities.length > 0 && (
          <div className="relative h-[550px] w-full max-w-[1920px]">
            {popularActivities.map((activity, index) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.id}`}
                className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${
                  index === currentBannerIndex ? 'z-1 opacity-100' : 'z-0 opacity-0'
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
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                </div>
                <div className="absolute bottom-200 left-[250px] flex flex-col gap-24 text-white">
                  <h2 className="line-clamp-2 w-600 text-wrap break-words text-68 font-bold leading-[81.15px]">
                    {activity.title}
                  </h2>
                  <p className="text-2xl-bold">{getCurrentMonth()}의 인기 체험 BEST🔥</p>
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
      </div>

      <div className="z-1 relative -mt-60">
        <Search onSearch={handleSearch} />
      </div>

      {!isSearching && (
        <section className="mt-50 flex flex-col gap-24">
          {popularActivities.length > 0 && (
            <div className="flex justify-between">
              <h2 className="leading-43 text-36 font-bold">🔥인기 체험</h2>
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
            {popularActivities.map((activity) => (
              <PopularActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-24">
        {!isSearching && (
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
        )}

        <div className="m-auto flex w-1200 flex-col gap-24">
          {isSearching ? (
            <h2 className="leading-42 mt-50 text-32 font-normal">
              <span className="text-3xl-bold text-black-100">{searchTerm}</span>(으)로 검색한 결과입니다.
            </h2>
          ) : (
            <h2 className="leading-43 text-36 font-bold">{activeCategory || '🥾모든 체험'}</h2>
          )}

          {isSearching && <span className="mb-24 text-lg-regular">총 {displayedActivities.length}개의 결과</span>}

          <div className="min-h-600">
            {displayedActivities.length > 0 ? (
              <div className="flex w-1204 flex-wrap gap-24">
                {displayedActivities.map((activity) => (
                  <ActivityCards key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <p className="h-600 text-xl text-gray-500">검색 결과가 없습니다.</p>
            )}
          </div>

          {displayedActivities.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isPlaceholderData={isActivitiesLoading}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default MainPage;
