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
const VISIBLE_TABS = 4;

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
  const [categoryStartIndex, setCategoryStartIndex] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
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
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1200;
      setIsDesktop(newIsDesktop);
      setIsTablet(window.innerWidth >= 744 && window.innerWidth < 1200);

      if (newIsDesktop) {
        setCategoryStartIndex(0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (tabsContainerRef.current && isTablet) {
      const tabWidth = tabsContainerRef.current.scrollWidth / categories.length;
      tabsContainerRef.current.style.transform = `translateX(-${categoryStartIndex * tabWidth}px)`;
    } else if (tabsContainerRef.current && isDesktop) {
      tabsContainerRef.current.style.transform = 'translateX(0)';
    }
  }, [categoryStartIndex, isTablet, isDesktop]);

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

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      setPage(1);
      setIsSearching(false);
      setSearchTerm('');
      setItemsPerPage(INITIAL_ITEMS_PER_PAGE);
      if (isDesktop) {
        setCategoryStartIndex(0);
      }
    },
    [isDesktop],
  );

  const handleCategoryNextClick = () => {
    if (categoryStartIndex + VISIBLE_TABS < categories.length) {
      setCategoryStartIndex((prev) => Math.min(prev + 1, categories.length - VISIBLE_TABS));
    }
  };

  const handleCategoryPrevClick = () => {
    if (categoryStartIndex > 0) {
      setCategoryStartIndex((prev) => Math.max(prev - 1, 0));
    }
  };

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
          <div className="lg:max-w-1920 sm:h-240 sm:w-375 md:h-550 md:w-1440">
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
                <div className="absolute flex flex-col text-white sm:bottom-[30%] sm:left-[18%] sm:w-200 sm:gap-8 md:bottom-200 md:left-[4%] md:w-450 lg:left-[1%] lg:w-600 lg:gap-24">
                  <h2 className="line-clamp-2 text-wrap break-words font-bold sm:text-24 sm:leading-[28.64px] md:text-54 md:leading-[64.44px] lg:text-68 lg:leading-[81.15px]">
                    {activity.title}
                  </h2>
                  <p className="sm:text-md-bold md:text-xl-bold lg:text-2xl-bold">
                    {getCurrentMonth()}의 인기 체험 BEST🔥
                  </p>
                </div>
              </Link>
            ))}
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
              <h2 className="md:leading-43 font-bold sm:text-18 md:text-36 md:leading-[21.48px]">🔥인기 체험</h2>
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
          <div className="flex sm:w-340 md:w-695 md:gap-32 lg:w-1200 lg:gap-24">
            {popularActivities.map((activity) => (
              <PopularActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-24">
        {!isSearching && (
          <div className="mb-24 flex items-center justify-between sm:w-340 md:w-695 md:gap-14 lg:w-1204">
            <div className="relative flex items-center overflow-hidden md:w-640 lg:w-full">
              {isTablet && !isDesktop && (
                <div className="flex-shrink-0">
                  {categoryStartIndex > 0 && (
                    <button
                      onClick={handleCategoryPrevClick}
                      className="z-1 flex h-32 w-32 items-center justify-center rounded-full border border-gray-600"
                    >
                      <PrevButton />
                    </button>
                  )}
                </div>
              )}

              <div
                className={`${isTablet && !isDesktop ? 'mx-10 w-[calc(100%-5rem)] overflow-hidden pr-60' : 'w-full'}`}
              >
                <RadioTab.Root defaultTab={activeCategory} onTabChange={handleCategoryChange}>
                  <div
                    ref={tabsContainerRef}
                    className={`flex ${
                      isTablet && !isDesktop ? 'gap-10 transition-transform duration-300 ease-in-out' : 'lg:gap-24'
                    }`}
                    style={isTablet && !isDesktop ? { width: `${(categories.length / VISIBLE_TABS) * 105}%` } : {}}
                  >
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`${isTablet && !isDesktop ? 'flex-shrink-0' : 'group lg:mb-2'}`}
                        style={isTablet && !isDesktop ? { width: `${100 / categories.length}%` } : {}}
                      >
                        <RadioTab.Item id={category}>
                          <span>{category}</span>
                        </RadioTab.Item>
                      </div>
                    ))}
                  </div>
                </RadioTab.Root>
              </div>

              {isTablet && !isDesktop && (
                <div className="w-32 flex-shrink-0">
                  {categoryStartIndex + VISIBLE_TABS < categories.length && (
                    <button
                      onClick={handleCategoryNextClick}
                      className="z-1 flex h-32 w-32 items-center justify-center rounded-full border border-gray-600"
                    >
                      <div className="flex h-20 w-35 items-center justify-center">
                        <NextButton />
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div
              className="relative cursor-pointer rounded-15 border border-black-100 sm:h-41 sm:w-90 md:h-53 md:w-120 lg:w-150"
              ref={dropdownRef}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex w-full items-center justify-center sm:py-9 md:px-20 md:py-14 ${sortBy ? 'gap-5' : 'md:20 sm:gap-10 lg:gap-40'}`}
              >
                <span className="text-black-100 sm:text-md-medium md:text-lg-medium">
                  {sortBy ? dropdownOptions.find((option) => option.value === sortBy)?.label : '가격'}
                </span>
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

        <div className="m-auto flex flex-col gap-24 sm:w-340 md:w-695 lg:w-1200">
          {isSearching ? (
            <h2 className="leading-42 mt-50 text-32 font-normal">
              <span className="text-3xl-bold text-black-100">{searchTerm}</span>(으)로 검색한 결과입니다.
            </h2>
          ) : (
            <h2 className="md:leading-43 font-bold sm:text-18 md:text-36 md:leading-[21.48px]">
              {activeCategory || '🥾모든 체험'}
            </h2>
          )}

          {isSearching && <span className="mb-24 text-lg-regular">총 {displayedActivities.length}개의 결과</span>}

          <div className="min-h-600">
            {displayedActivities.length > 0 ? (
              <div className="flex flex-wrap sm:w-340 sm:gap-4 md:w-695 md:gap-16 lg:w-1204 lg:gap-24">
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
