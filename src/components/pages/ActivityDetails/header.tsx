import Star from '@/../public/assets/icons/new-star.svg';
import DropDown from '@/components/common/Dropdown';
import { useClickOutside } from '@/hooks/useClickOutside';
import useToast from '@/hooks/useToast';
import { HeaderProps } from '@/types/activity';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = ({
  myId,
  title,
  rating,
  userId,
  address,
  category,
  activityId,
  reviewCount,
  scrollToReviews,
  handleDeleteConfirmation,
}: HeaderProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const router = useRouter();
  const hasAccessToken = localStorage.getItem('accessToken');

  const toast = useToast();
  useEffect(() => {
    if (showCopiedMessage) {
      toast.success('링크가 복사됐습니다');
    }
  }, [showCopiedMessage]);

  const handleDropdownVisible = () => {
    setIsOpenDropdown((prev) => !prev);
  };
  const modalRef = useClickOutside(handleDropdownVisible);

  const handleOptionClick = async (option: string) => {
    if (option === '수정하기') {
      router.push(`/my-page/regist-activity/${activityId}`);
    }
    if (option === '삭제하기') {
      handleDeleteConfirmation();
    }
    setIsOpenDropdown(false);
  };

  const kebabButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.15 },
    tap: { scale: 0.95 },
  };

  const shareButtonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.2 },
    tap: { scale: 0.95 },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        duration: 0.3,
      },
    },
  };

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    });
  };

  return (
    <div className="px-16 pt-16 md:px-24 md:pt-24 lg:p-0">
      <div className="text-md-regular text-black-100">{category}</div>
      <div className="relative mt-10 flex items-center justify-between">
        <h1 className="text-2xl-bold text-black-100 md:text-3xl-bold">{title}</h1>
        <div className="flex items-center">
          <motion.button
            onClick={handleShareClick}
            className="relative mr-8 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full focus:outline-none"
            variants={shareButtonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Image src="/assets/icons/share.svg" fill sizes="(min-width: 375px) 30px," alt="링크 복사" />
          </motion.button>
          {myId === userId && hasAccessToken && (
            <motion.svg
              width="30"
              height="30"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              variants={kebabButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={handleDropdownVisible}
              className="cursor-pointer focus:outline-none"
              style={{ originX: '50%', originY: '50%' }}
            >
              <circle cx="16.0001" cy="7.70005" r="2.4" fill="#79747E" />
              <circle cx="16.0001" cy="16.5001" r="2.4" fill="#79747E" />
              <circle cx="16.0001" cy="25.2999" r="2.4" fill="#79747E" />
            </motion.svg>
          )}
        </div>
        <AnimatePresence>
          {isOpenDropdown && (
            <motion.div
              ref={modalRef}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="absolute right-120 top-48 z-50"
            >
              <DropDown classNames="h-max w-120">
                <DropDown.Option
                  className="hover:rounded-t-6"
                  key="수정하기"
                  handleOptionClick={() => handleOptionClick('수정하기')}
                  label="수정하기"
                />
                <DropDown.Option
                  className="hover:rounded-b-6"
                  key="삭제하기"
                  handleOptionClick={() => handleOptionClick('삭제하기')}
                  label="삭제하기"
                />
              </DropDown>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-16 flex">
        <Star height="18" width="18" alt="별점 아이콘" className="mt-1" />
        <span className="ml-4 text-lg-bold text-black">{rating}</span>

        <span className="ml-6 cursor-pointer text-gray-700 underline hover:text-gray-900" onClick={scrollToReviews}>
          {`후기 ${reviewCount}개`}
        </span>
        <span className="relative ml-18 mt-2 h-18 w-18">
          <Image src="/assets/icons/map.svg" fill alt="지도 아이콘" />
        </span>
        <span className="ml-2 text-md-regular text-black-100">{address}</span>
      </div>
    </div>
  );
};

export default Header;
