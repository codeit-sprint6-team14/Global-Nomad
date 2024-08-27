import { getUserProfile } from '@/apis/myPage/myProfile';
import Modal from '@/components/common/Modal';
import { useSignout } from '@/components/pages/auth/useSignout';
import { useClickOutside } from '@/hooks/useClickOutside';
import { tokenAtom } from '@/store/tokenAtom';
import { userAtom } from '@/store/userAtom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import DropDown from '../Dropdown';
import Notification from './Notification';

function NavBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const signout = useSignout();

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

  const loadUserProfile = useCallback(async () => {
    if (token) {
      try {
        const data = await getUserProfile();
        setUser({
          email: data.email,
          nickname: data.nickname,
          profileImage: data.profileImageUrl,
        });
      } catch (error) {
        console.error('유저 정보 불러오기 실패: ', error);
        // 에러 발생 시 토큰 제거 및 사용자 정보 초기화
        setToken(null);
        setUser({ email: '', nickname: '', profileImage: '' });
      }
    } else {
      // 토큰이 없는 경우 사용자 정보 초기화
      setUser({ email: '', nickname: '', profileImage: '' });
    }
  }, [token, setUser, setToken]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  const handleDropdownVisible = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const modalRef = useClickOutside(() => {
    setIsOpenMenu(false);
  });

  const handleSignout = () => {
    setShowLogoutModal(true);
    setIsOpenMenu(false);
  };

  const handleOptionClick = (label: string) => {
    switch (label) {
      case '로그아웃':
        handleSignout();
        break;
      case '마이페이지':
        router.push('/my-page');
        break;
      default:
        break;
    }
    setIsOpenMenu(false);
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
    signout();
    setToken(null);
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-10 border-b border-solid border-gray-300 bg-white">
      <div className="flex h-70 items-center justify-between p-20 lg:mx-auto lg:max-w-[1200px]">
        <Link href="/">
          <Image width={172} height={30} src="/assets/images/navbar-logo.svg" alt="네비바 로고" priority />
        </Link>
        {token ? (
          <div className="flex items-center">
            <div className="mt-8">
              <Notification />
            </div>

            <div className="mx-12 h-22 border-l border-solid border-gray-300 md:mx-25" />
            <div
              className="relative flex cursor-pointer items-center gap-10"
              ref={modalRef}
              onClick={handleDropdownVisible}
            >
              <div className="relative h-32 w-32 overflow-hidden rounded-full border">
                <Image
                  src={user.profileImage || '/assets/images/profile-image.png'}
                  alt="프로필 이미지"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                />
              </div>
              <div className="cursor-pointer text-md-medium text-black">{user.nickname}</div>
              <AnimatePresence>
                {isOpenMenu && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute right-110 top-40 z-50"
                  >
                    <DropDown classNames="h-max w-120">
                      <DropDown.Option
                        className=""
                        key="로그아웃"
                        handleOptionClick={handleOptionClick}
                        label="로그아웃"
                      />
                      <DropDown.Option
                        className=""
                        key="마이페이지"
                        handleOptionClick={handleOptionClick}
                        label="마이페이지"
                      />
                    </DropDown>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex gap-24">
            <Link href="/signin">
              <div className="cursor-pointer text-md-medium text-black">로그인</div>
            </Link>
            <Link href="/signup">
              <div className="cursor-pointer text-md-medium text-black">회원가입</div>
            </Link>
          </div>
        )}
      </div>

      <Modal.Overlay isOpen={showLogoutModal} onClose={handleModalClose}>
        <Modal.RegisterConfirm onClose={handleModalClose}>로그아웃 되었습니다!</Modal.RegisterConfirm>
      </Modal.Overlay>
    </div>
  );
}

export default NavBar;
