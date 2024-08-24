import DownArrow from '@/../public/assets/icons/down-arrow.svg';
import PrevButton from '@/../public/assets/icons/left-arrow.svg';
import NextButton from '@/../public/assets/icons/right-arrow.svg';
import { getActivities, useActivities } from '@/apis/mainPage/activities';
import DropDownList from '@/components/common/Dropdown/dropDownList';
import DropDownOption from '@/components/common/Dropdown/dropDownOption';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ActivityCards from './ActivityCards';
import PopularActivityCard from './PopularActivityCard';
import { RadioTab } from './RadioTab';

const categories = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

const VISIBLE_TABS = 4;

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [bannerLoadError, setBannerLoadError] = useState<Record<number, boolean>>({});
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [categoryStartIndex, setCategoryStartIndex] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const popularActivitiesRef = useRef<HTMLDivElement>(null);

  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [displayedActivities, setDisplayedActivities] = useState<Activity[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = isDesktop ? 16 : isTablet ? 9 : 8;

  const backgroundColors = useMemo(() => ['bg-purple-100', 'bg-pink-200', 'bg-sky-200'], []);

  const getDropdownOptions = useCallback(() => {
    if (isDesktop) {
      return [
        { value: 'priceLow', label: '가격 낮은순' },
        { value: 'priceHigh', label: '가격 높은순' },
      ];
    } else {
      return [
        { value: 'priceLow', label: '낮은순' },
        { value: 'priceHigh', label: '높은순' },
      ];
    }
  }, [isDesktop]);

  const dropdownOptions = getDropdownOptions();

  const getRandomBackgroundColor = () => {
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  };

  const handleImageError = (activityId: number) => {
    setBannerLoadError((prev) => ({ ...prev, [activityId]: true }));
  };

  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useActivities(1, 1000, null, null, null);

  const { data: popularActivitiesData, isLoading: isPopularActivitiesLoading } = useQuery({
    queryKey: ['popularActivities'],
    queryFn: async () => {
      const data = await getActivities(1, 100, null, null);
      return data.activities.filter((activity) => activity.rating >= 2.0);
    },
    placeholderData: [],
  });

  const popularActivities = popularActivitiesData || [];

  const filteredPopularActivities = useMemo(() => {
    return popularActivities.filter((activity) => activity.rating >= 4);
  }, [popularActivities]);

  useEffect(() => {
    if (activitiesData && activitiesData.activities) {
      setAllActivities(activitiesData.activities);
      const categoryActivities = activeCategory
        ? activitiesData.activities.filter((activity) => activity.category === activeCategory)
        : activitiesData.activities;
      setDisplayedActivities(categoryActivities);
      setTotalPages(Math.ceil(categoryActivities.length / ITEMS_PER_PAGE));
    }
  }, [activitiesData, activeCategory, ITEMS_PER_PAGE]);

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1200;
      const newIsTablet = window.innerWidth >= 744 && window.innerWidth < 1200;
      setIsDesktop(newIsDesktop);
      setIsTablet(newIsTablet);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (tabsContainerRef.current && (isTablet || !isDesktop)) {
      const tabWidth = tabsContainerRef.current.scrollWidth / categories.length;
      tabsContainerRef.current.style.transform = `translateX(-${categoryStartIndex * tabWidth}px)`;
    } else if (tabsContainerRef.current && isDesktop) {
      tabsContainerRef.current.style.transform = 'translateX(0)';
    }
  }, [categoryStartIndex, isTablet, isDesktop, categories.length]);

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
    if (filteredPopularActivities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % filteredPopularActivities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredPopularActivities]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setPage(1);
      if (term) {
        setIsSearching(true);
        const results = allActivities.filter((activity) => activity.title.toLowerCase().includes(term.toLowerCase()));
        setDisplayedActivities(results);
        setTotalPages(Math.ceil(results.length / ITEMS_PER_PAGE));
      } else {
        setIsSearching(false);
        const categoryActivities = activeCategory
          ? allActivities.filter((activity) => activity.category === activeCategory)
          : allActivities;
        setDisplayedActivities(categoryActivities);
        setTotalPages(Math.ceil(categoryActivities.length / ITEMS_PER_PAGE));
      }
    },
    [allActivities, activeCategory, ITEMS_PER_PAGE],
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      setPage(1);
      setIsSearching(false);
      setSearchTerm('');
      const categoryActivities = category
        ? allActivities.filter((activity) => activity.category === category)
        : allActivities;
      setDisplayedActivities(categoryActivities);
      setTotalPages(Math.ceil(categoryActivities.length / ITEMS_PER_PAGE));
    },
    [allActivities, ITEMS_PER_PAGE],
  );

  const handleCategoryPrevClick = () => {
    if (categoryStartIndex > 0) {
      setCategoryStartIndex((prev) => Math.max(prev - 1, 0));
    }
    if (tabsContainerRef.current) {
      const tabWidth = tabsContainerRef.current.scrollWidth / categories.length;
      tabsContainerRef.current.scrollLeft = Math.max(0, tabsContainerRef.current.scrollLeft - tabWidth);
    }
  };

  const handleCategoryNextClick = () => {
    if (categoryStartIndex + VISIBLE_TABS < categories.length) {
      setCategoryStartIndex((prev) => Math.min(prev + 1, categories.length - VISIBLE_TABS));
    }
    if (tabsContainerRef.current) {
      const tabWidth = tabsContainerRef.current.scrollWidth / categories.length;
      tabsContainerRef.current.scrollLeft = Math.min(
        tabsContainerRef.current.scrollWidth - tabsContainerRef.current.clientWidth,
        tabsContainerRef.current.scrollLeft + tabWidth,
      );
    }
  };

  const handleSortChange = useCallback((option: string) => {
    setSortBy(option);
  }, []);

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex - 3;
      return newIndex < 0 ? filteredPopularActivities.length + newIndex : newIndex;
    });
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => (prevIndex + 3) % filteredPopularActivities.length);
  };

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const getCurrentMonth = () => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    return months[new Date().getMonth()];
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDesktop || isTablet || !tabsContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tabsContainerRef.current.offsetLeft);
    setScrollLeft(tabsContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDesktop || isTablet || !isDragging || !tabsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabsContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (!isDesktop && !isTablet) {
      tabsContainerRef.current.scrollLeft = scrollLeft + walk * -1;
    } else {
      tabsContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!popularActivitiesRef.current) return;
    setIsDragging(true);
    setStartX(
      'touches' in e
        ? e.touches[0].pageX - popularActivitiesRef.current.offsetLeft
        : e.pageX - popularActivitiesRef.current.offsetLeft,
    );
    setScrollLeft(popularActivitiesRef.current.scrollLeft);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDragMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging || !popularActivitiesRef.current) return;
      e.preventDefault();
      const x =
        'touches' in e
          ? e.touches[0].pageX - popularActivitiesRef.current.offsetLeft
          : e.pageX - popularActivitiesRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      popularActivitiesRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft],
  );

  if (isActivitiesLoading || isPopularActivitiesLoading) return <div>loading...</div>;
  if (activitiesError) return <div>{activitiesError.message}</div>;

  return (
    <main className="flex flex-col items-center bg-gray-100">
      <div className="relative w-full">
        {filteredPopularActivities.length > 0 && (
          <div className="lg:max-w-1920 sm:h-240 sm:w-375 md:h-550 md:w-1440">
            {filteredPopularActivities.map((activity, index) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.id}`}
                className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${
                  index === currentBannerIndex ? 'z-1 opacity-100' : 'z-0 opacity-0'
                }`}
              >
                <div className="relative h-full w-full">
                  {bannerLoadError[activity.id] ? (
                    <div
                      className={`absolute inset-0 ${getRandomBackgroundColor()} flex items-center justify-center`}
                    ></div>
                  ) : (
                    <Image
                      src={activity.bannerImageUrl}
                      alt={`Featured Activity Banner ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      priority={index === currentBannerIndex}
                      className="transition-transform duration-300"
                      onError={() => handleImageError(activity.id)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                </div>
                <div className="absolute left-0 right-0 sm:top-[25%] md:top-[45%] lg:top-[35%]">
                  <div className="mx-auto px-0 sm:max-w-[375px] sm:px-[3%] md:max-w-[744px] md:px-[3%] lg:max-w-[1200px] lg:px-[1%]">
                    <div className="flex w-[95%] flex-col text-white sm:h-120 sm:w-[85%] md:h-162 md:w-[70%] md:gap-8 lg:h-215 lg:w-[55%] lg:gap-24">
                      <h2 className="sm:h- line-clamp-2 text-wrap break-words text-24 font-bold leading-[28.64px] sm:text-32 sm:leading-[38px] md:h-128 md:text-54 md:leading-[64.44px] lg:h-162 lg:text-68 lg:leading-[81.15px]">
                        {activity.title}
                      </h2>
                      <p className="sm:text-md-bold md:text-xl-bold lg:text-2xl-bold">
                        {getCurrentMonth()}의 인기 체험 BEST🔥
                      </p>
                    </div>
                  </div>
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
        <section className="mt-50 flex max-w-[1200px] flex-col gap-24 px-4 md:w-675 lg:w-1200">
          <div className="flex items-center justify-between">
            <h2 className="md:leading-43 font-bold sm:text-18 md:text-36 md:leading-[21.48px]">🔥인기 체험</h2>
            {isDesktop && filteredPopularActivities.length > 3 && (
              <div className="flex gap-12">
                <button onClick={handlePrevClick} className="cursor-pointer">
                  <PrevButton />
                </button>
                <button onClick={handleNextClick} className="cursor-pointer">
                  <NextButton />
                </button>
              </div>
            )}
          </div>
          {filteredPopularActivities.length > 0 && (
            <div
              ref={popularActivitiesRef}
              className={`m-auto flex overflow-x-auto scrollbar-hide sm:w-340 sm:gap-16 md:w-675 md:gap-32 lg:w-1200 lg:gap-24 ${!isDesktop ? 'snap-x snap-mandatory scroll-smooth' : ''}`}
              style={{ scrollBehavior: 'smooth' }}
              onMouseDown={!isDesktop ? handleDragStart : undefined}
              onMouseUp={!isDesktop ? handleDragEnd : undefined}
              onMouseLeave={!isDesktop ? handleDragEnd : undefined}
              onMouseMove={!isDesktop ? handleDragMove : undefined}
              onTouchStart={!isDesktop ? handleDragStart : undefined}
              onTouchEnd={!isDesktop ? handleDragEnd : undefined}
              onTouchMove={!isDesktop ? handleDragMove : undefined}
            >
              {isDesktop
                ? [0, 1, 2].map((offset) => {
                    const index = (startIndex + offset) % filteredPopularActivities.length;
                    const activity = filteredPopularActivities[index];
                    return activity ? (
                      <PopularActivityCard key={`${activity.id}-${index}`} activity={activity} />
                    ) : null;
                  })
                : filteredPopularActivities.map((activity, index) => (
                    <div key={`${activity.id}-${index}`} className="flex-shrink-0 snap-center">
                      <div className="flex">
                        <PopularActivityCard activity={activity} />
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </section>
      )}

      {!isSearching && (
        <section className="flex flex-col gap-24">
          <div className="mb-24 flex items-center justify-between sm:w-340 md:w-695 md:gap-14 lg:w-1204">
            <div className="relative flex items-center overflow-hidden sm:w-375 md:w-640 lg:w-full">
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
                className={`${
                  isDesktop || isTablet
                    ? `${isTablet && !isDesktop ? 'mx-10 w-[calc(100%-5rem)] overflow-hidden pr-60' : 'w-full'}`
                    : 'w-250 overflow-x-auto scrollbar-hide'
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <RadioTab.Root defaultTab={activeCategory} onTabChange={handleCategoryChange}>
                  <div
                    ref={tabsContainerRef}
                    className={`flex ${
                      isTablet && !isDesktop
                        ? 'gap-10 transition-transform duration-300 ease-in-out'
                        : isDesktop
                          ? 'lg:gap-24'
                          : 'sm:gap-8'
                    }`}
                    style={isTablet && !isDesktop ? { width: `${(categories.length / VISIBLE_TABS) * 105}%` } : {}}
                  >
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`${
                          isTablet && !isDesktop ? 'flex-shrink-0' : isDesktop ? 'group lg:mb-2' : 'flex-shrink-0'
                        }`}
                        style={isTablet && !isDesktop ? { width: `${100 / categories.length}%` } : {}}
                      >
                        <RadioTab.Item id={category}>
                          <span className="block whitespace-nowrap px-3 py-2 text-sm">{category}</span>
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
              className="relative cursor-pointer rounded-15 border border-black-100 sm:h-41 sm:w-100 md:h-53 md:w-130 lg:w-170"
              ref={dropdownRef}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex w-full items-center justify-center sm:py-9 md:px-20 md:py-14 ${
                  sortBy ? 'gap-5' : 'md:20 sm:gap-10 lg:gap-40'
                }`}
              >
                <span className="text-black-100 sm:text-md-medium md:text-lg-medium">
                  {sortBy
                    ? isDesktop
                      ? dropdownOptions.find((option) => option.value === sortBy)?.label
                      : `${dropdownOptions.find((option) => option.value === sortBy)?.label}`
                    : '가격'}
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
                      label={isDesktop ? option.label : `${option.label}`}
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
        </section>
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
              {displayedActivities.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map((activity) => (
                <ActivityCards key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <p className="h-600 text-xl text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isPlaceholderData={isActivitiesLoading}
          />
        )}
      </div>
    </main>
  );
};

export default MainPage;
