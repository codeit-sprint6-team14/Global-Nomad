import DownArrow from '@/../public/assets/icons/down-arrow.svg';
import LeftButton from '@/../public/assets/icons/left-arrow.svg';
import NextButton from '@/../public/assets/icons/next-button.svg';
import PrevButton from '@/../public/assets/icons/prev-button.svg';
import RightButton from '@/../public/assets/icons/right-arrow.svg';
import { getActivities, useActivities } from '@/apis/mainPage/activities';
import DropDownList from '@/components/common/Dropdown/dropDownList';
import DropDownOption from '@/components/common/Dropdown/dropDownOption';
import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import ActivityCards from './ActivityCards';
import PopularActivityCard from './PopularActivityCard';
import { RadioTab } from './RadioTab';
import { Activity } from './mainPage.type';

const categories = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

const VISIBLE_TABS = 4;

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [categoryTranslate, setCategoryTranslate] = useState(0);
  const [bannerLoadError, setBannerLoadError] = useState<Record<number, boolean>>({});
  const [bannerBackgrounds, setBannerActivityBackgrounds] = useState<Record<number, string>>({});
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [categoryStartIndex, setCategoryStartIndex] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const popularActivitiesRef = useRef<HTMLDivElement>(null);
  const prevIsTabletRef = useRef(false);

  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [displayedActivities, setDisplayedActivities] = useState<Activity[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const getItemsPerPage = useCallback(
    (isSearching: boolean) => {
      if (isSearching) {
        return isDesktop ? 16 : isTablet ? 9 : 8;
      } else {
        return isDesktop ? 8 : isTablet ? 9 : 4;
      }
    },
    [isDesktop, isTablet],
  );
  const isLeftButtonVisible = isTablet && !isDesktop && categoryStartIndex > 0;
  const isRightButtonVisible = isTablet && !isDesktop && categoryStartIndex + VISIBLE_TABS < categories.length;
  const ITEMS_PER_PAGE = useMemo(() => getItemsPerPage(isSearching), [getItemsPerPage, isSearching]);

  const calculateTotalPages = useCallback(
    (activities: Activity[]) => {
      return Math.ceil(activities.length / ITEMS_PER_PAGE);
    },
    [ITEMS_PER_PAGE],
  );

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

  const getScrollDistance = useCallback(() => {
    if (isTablet) return 500;
    return 300;
  }, [isTablet]);

  const dropdownOptions = getDropdownOptions();

  const handleImageError = useCallback(
    (id: number) => {
      setBannerLoadError((prev) => ({ ...prev, [id]: true }));

      setBannerActivityBackgrounds((prev) => {
        if (!prev[id]) {
          const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
          return { ...prev, [id]: randomColor };
        }
        return prev;
      });
    },
    [backgroundColors],
  );

  const getBackgroundColor = useCallback(
    (id: number): string => {
      return bannerBackgrounds[id] || backgroundColors[0];
    },
    [bannerBackgrounds, backgroundColors],
  );

  const {
    data: activitiesData,
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useActivities(1, 1000, null, null, null);

  const { data: popularActivitiesData, isLoading: isPopularActivitiesLoading } = useQuery({
    queryKey: ['popularActivities'],
    queryFn: async () => {
      const data = await getActivities(1, 100, null, null);
      return data.activities.filter((activity) => activity.rating >= 4);
    },
    placeholderData: [],
  });

  const popularActivities = popularActivitiesData || [];

  const filteredPopularActivities = useMemo(() => {
    return popularActivities.filter((activity) => activity.rating >= 4);
  }, [popularActivities]);

  const sortActivities = useCallback((activities: Activity[], sortOption: string | null) => {
    if (!sortOption) return activities;

    return [...activities].sort((a, b) => {
      if (sortOption === 'priceLow') {
        return a.price - b.price;
      } else if (sortOption === 'priceHigh') {
        return b.price - a.price;
      }
      return 0;
    });
  }, []);

  useEffect(() => {
    if (activitiesData && activitiesData.activities) {
      setAllActivities(activitiesData.activities);
      const categoryActivities = activeCategory
        ? activitiesData.activities.filter((activity) => activity.category === activeCategory)
        : activitiesData.activities;
      const sortedActivities = sortActivities(categoryActivities, sortBy);
      setDisplayedActivities(sortedActivities);
      setTotalPages(calculateTotalPages(sortedActivities));
    }
  }, [activitiesData, activeCategory, sortBy, sortActivities, calculateTotalPages]);

  useEffect(() => {
    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 1200;
      const newIsTablet = window.innerWidth >= 744 && window.innerWidth < 1200;
      if (newIsTablet && !prevIsTabletRef.current && !isDesktop) {
        setCategoryStartIndex(0);
        setCategoryTranslate(0);
      }

      setIsDesktop(newIsDesktop);
      setIsTablet(newIsTablet);
      prevIsTabletRef.current = newIsTablet;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop]);

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
      if (term.trim()) {
        setIsSearching(true);
        setActiveCategory('');
        const results = allActivities.filter((activity) => activity.title.toLowerCase().includes(term.toLowerCase()));
        const sortedResults = sortActivities(results, sortBy);
        setDisplayedActivities(sortedResults);
        setTotalPages(calculateTotalPages(sortedResults));
      } else {
        setIsSearching(false);
        const sortedActivities = sortActivities(allActivities, sortBy);
        setDisplayedActivities(sortedActivities);
        setTotalPages(calculateTotalPages(sortedActivities));
        setActiveCategory('');
      }
    },
    [allActivities, sortBy, sortActivities, calculateTotalPages],
  );

  useEffect(() => {
    if (isSearching) {
      const results = allActivities.filter((activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      const sortedResults = sortActivities(results, sortBy);
      setDisplayedActivities(sortedResults);
      setTotalPages(calculateTotalPages(sortedResults));
    }
  }, [isSearching, searchTerm, allActivities, sortBy, sortActivities, calculateTotalPages]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setActiveCategory(category);
      setPage(1);
      setIsSearching(false);
      setSearchTerm('');
      const categoryActivities = category
        ? allActivities.filter((activity) => activity.category === category)
        : allActivities;
      const sortedActivities = sortActivities(categoryActivities, sortBy);
      setDisplayedActivities(sortedActivities);
      setTotalPages(calculateTotalPages(sortedActivities));
    },
    [allActivities, sortBy, sortActivities, calculateTotalPages],
  );

  const handleCategoryPrevClick = () => {
    if (isTablet && !isDesktop) {
      if (categoryStartIndex > 0) {
        setCategoryStartIndex((prev) => prev - 1);
        setCategoryTranslate((prev) => prev + 100);
      }
    } else {
      if (categoryStartIndex > 0) {
        setCategoryStartIndex((prev) => Math.max(prev - 1, 0));
        if (tabsContainerRef.current) {
          const tabWidth = tabsContainerRef.current.scrollWidth / categories.length;
          tabsContainerRef.current.scrollLeft = Math.max(0, tabsContainerRef.current.scrollLeft - tabWidth);
        }
      }
    }
  };

  const handleCategoryNextClick = () => {
    if (isTablet && !isDesktop) {
      if (categoryStartIndex + VISIBLE_TABS < categories.length) {
        setCategoryStartIndex((prev) => prev + 1);
        setCategoryTranslate((prev) => prev - 100);
      }
    } else {
      if (categoryStartIndex + VISIBLE_TABS < categories.length) {
        setCategoryStartIndex((prev) => Math.min(prev + 1, categories.length - VISIBLE_TABS));
        if (tabsContainerRef.current) {
          const tabWidth = tabsContainerRef.current.scrollWidth / categories.length;
          tabsContainerRef.current.scrollLeft = Math.min(
            tabsContainerRef.current.scrollWidth - tabsContainerRef.current.clientWidth,
            tabsContainerRef.current.scrollLeft + tabWidth,
          );
        }
      }
    }
  };

  const handleSortChange = useCallback(
    (option: string) => {
      setSortBy(option);
      const sortedActivities = sortActivities(displayedActivities, option);
      setDisplayedActivities(sortedActivities);
      setTotalPages(calculateTotalPages(sortedActivities));
    },
    [displayedActivities, sortActivities, calculateTotalPages],
  );

  const handlePrevClick = useCallback(() => {
    if (isDesktop) {
      setStartIndex((prevIndex) => {
        const newIndex = prevIndex - 3;
        return newIndex < 0 ? filteredPopularActivities.length + newIndex : newIndex;
      });
    } else if (popularActivitiesRef.current) {
      const scrollDistance = getScrollDistance();
      const newScrollPosition = Math.max(0, scrollPosition - scrollDistance);
      popularActivitiesRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newScrollPosition);
    }
  }, [isDesktop, scrollPosition, getScrollDistance, filteredPopularActivities.length]);

  const handleNextClick = useCallback(() => {
    if (isDesktop) {
      setStartIndex((prevIndex) => (prevIndex + 3) % filteredPopularActivities.length);
    } else if (popularActivitiesRef.current) {
      const scrollDistance = getScrollDistance();
      const maxScroll = popularActivitiesRef.current.scrollWidth - popularActivitiesRef.current.clientWidth;
      const newScrollPosition = Math.min(maxScroll, scrollPosition + scrollDistance);
      popularActivitiesRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newScrollPosition);
    }
  }, [isDesktop, scrollPosition, getScrollDistance, filteredPopularActivities.length]);

  useEffect(() => {
    if (isDesktop) return;

    const handleScroll = () => {
      if (popularActivitiesRef.current) {
        setScrollPosition(popularActivitiesRef.current.scrollLeft);
      }
    };

    const popularActivities = popularActivitiesRef.current;
    if (popularActivities) {
      popularActivities.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (popularActivities) {
        popularActivities.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isDesktop]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const getCurrentMonth = () => {
    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    return months[new Date().getMonth()];
  };

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (isDesktop) return;
      setIsDragging(true);
      setStartX('touches' in e ? e.touches[0].clientX : e.clientX);
      setCurrentTranslate(0);
    },
    [isDesktop],
  );

  const handleDragMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (isDesktop || !isDragging) return;
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const diff = currentX - startX;
      setCurrentTranslate(diff);
    },
    [isDesktop, isDragging, startX],
  );

  const handleDragEnd = useCallback(() => {
    if (isDesktop || !isDragging) return;
    setIsDragging(false);
    const movedBy = currentTranslate;

    if (Math.abs(movedBy) > 100) {
      if (movedBy > 0) {
        handlePrevClick();
      } else {
        handleNextClick();
      }
    }
    setCurrentTranslate(0);
  }, [isDesktop, currentTranslate, handleNextClick, handlePrevClick, isDragging]);

  useEffect(() => {
    const handleMouseUp = () => handleDragEnd();
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleDragEnd]);

  if (isActivitiesLoading || isPopularActivitiesLoading) return <div>loading...</div>;
  if (activitiesError) return <div>{activitiesError.message}</div>;

  return (
    <main className="flex flex-col items-center bg-gray-100">
      <NavBar />
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
                      className={`absolute inset-0 ${getBackgroundColor(activity.id)} flex items-center justify-center`}
                    ></div>
                  ) : (
                    <Image
                      src={activity.bannerImageUrl}
                      alt={`Featured Activity Banner ${index + 1}`}
                      width={1440}
                      height={550}
                      sizes="100vw"
                      style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                      priority
                      className="transition-transform duration-300"
                      onError={() => handleImageError(activity.id)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                </div>
                <div className="absolute left-0 right-0 sm:top-[35%] md:top-[45%] lg:top-[35%]">
                  <div className="mx-auto px-0 sm:max-w-[375px] sm:px-[3%] md:max-w-[744px] md:px-[3%] lg:max-w-[1200px] lg:px-[1%]">
                    <div className="flex w-[95%] flex-col text-white sm:h-120 sm:w-[85%] sm:gap-8 md:h-162 md:w-[70%] lg:h-215 lg:w-[55%] lg:gap-24">
                      <h2 className="line-clamp-2 flex items-end text-wrap break-words font-bold sm:h-58 sm:text-24 sm:leading-[28.64px] md:h-128 md:text-54 md:leading-[64.44px] lg:h-162 lg:text-68 lg:leading-[81.15px]">
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
        <section className="mt-50 flex max-w-[1200px] flex-col px-4 sm:gap-16 md:w-675 md:gap-32 lg:w-1200 lg:gap-48">
          <div className="flex items-center justify-between">
            <h2 className="md:leading-43 font-bold sm:text-18 md:text-36 md:leading-[21.48px]">🔥인기 체험</h2>
            {filteredPopularActivities.length > (isDesktop ? 3 : 1) && (
              <div className="flex items-center sm:gap-6 md:gap-12">
                <button onClick={handlePrevClick} className="transition-transform hover:scale-110">
                  {!isTablet && !isDesktop ? <PrevButton className="h-25 w-25" /> : <LeftButton />}
                </button>
                <button onClick={handleNextClick} className="transition-transform hover:scale-110">
                  {!isTablet && !isDesktop ? <NextButton className="h-25 w-25" /> : <RightButton />}
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
                    <div
                      key={`${activity.id}-${index}`}
                      className={`flex flex-shrink-0 transition-transform duration-300 ease-in-out ${
                        index === startIndex ? 'translate-x-0' : 'translate-x-full'
                      }`}
                      style={{
                        transform: `translateX(-${startIndex * 100}%)`,
                      }}
                    >
                      <PopularActivityCard activity={activity} />
                    </div>
                  ))}
            </div>
          )}
        </section>
      )}

      {!isSearching && (
        <section className="flex flex-col sm:mb-8 md:mb-32 lg:mb-48">
          <div className="mb-24 flex items-center justify-between sm:w-340 md:w-695 md:gap-14 lg:w-1204">
            <div className="relative flex items-center overflow-hidden sm:w-375 md:w-680 lg:w-full">
              {isLeftButtonVisible && (
                <div className="flex-shrink-0">
                  <button onClick={handleCategoryPrevClick}>
                    <PrevButton className="flex h-32 w-32 items-center justify-center rounded-full border border-gray-600" />
                  </button>
                </div>
              )}

              <div
                className={`${
                  isDesktop || !isTablet
                    ? `${!isDesktop ? 'w-250 overflow-x-auto scrollbar-hide' : 'w-full'}`
                    : 'mx-10 w-[calc(100%-5rem)] overflow-hidden'
                }`}
              >
                <RadioTab.Root defaultTab={activeCategory} onTabChange={handleCategoryChange}>
                  <div
                    ref={tabsContainerRef}
                    className={`flex ${
                      isTablet && !isDesktop
                        ? 'gap-2 transition-transform duration-300 ease-in-out'
                        : isDesktop
                          ? 'lg:gap-24'
                          : 'sm:gap-8'
                    }`}
                    style={isTablet && !isDesktop ? { transform: `translateX(${categoryTranslate}%)` } : {}}
                  >
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`${
                          isTablet && !isDesktop
                            ? 'w-120 flex-shrink-0 px-1'
                            : isDesktop
                              ? 'group lg:mb-2'
                              : 'flex-shrink-0'
                        }`}
                      >
                        <RadioTab.Item id={category}>
                          <span className="block whitespace-nowrap px-3 py-2 text-sm">{category}</span>
                        </RadioTab.Item>
                      </div>
                    ))}
                  </div>
                </RadioTab.Root>
              </div>

              {isRightButtonVisible && (
                <div className="flex-shrink-0">
                  <button onClick={handleCategoryNextClick}>
                    <NextButton className="flex h-30 w-30 rounded-full border border-gray-600" />
                  </button>
                </div>
              )}
            </div>

            <div
              className="relative cursor-pointer rounded-15 border border-black-100 sm:h-41 sm:w-120 md:h-53 md:w-130 lg:w-170"
              ref={dropdownRef}
            >
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex w-full items-center justify-center sm:py-9 md:px-18 md:py-14 ${
                  sortBy ? 'gap-5' : 'sm:gap-10 md:gap-20 lg:gap-40'
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

      <div className="m-auto flex flex-col sm:w-340 sm:gap-16 md:w-695 md:gap-32 lg:w-1200 lg:gap-48">
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
            <motion.div
              className="flex flex-wrap sm:min-h-[550px] sm:w-340 sm:gap-4 md:min-h-[650px] md:w-695 md:gap-16 lg:min-h-[800px] lg:w-1204 lg:gap-24"
              layout
            >
              <AnimatePresence mode="popLayout">
                {displayedActivities.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map((activity) => (
                  <motion.div
                    key={activity.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{
                      opacity: { duration: 0.1 },
                      x: { type: 'spring', stiffness: 100, damping: 15 },
                      layout: {
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                      },
                    }}
                  >
                    <ActivityCards activity={activity} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-600 text-xl text-gray-500"
            >
              {isSearching ? '검색 결과가 없습니다' : '등록된 활동이 없습니다'}
            </motion.p>
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
      <Footer />
    </main>
  );
};

export default MainPage;
