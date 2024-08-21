import { getUserProfile } from '@/apis/getUserProfile';
import Modal from '@/components/common/Modal';
import { useSignout } from '@/components/pages/auth/useSignout';
import { useClickOutside } from '@/hooks/useClickOutside';
import { userAtom } from '@/store/userAtom';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DropDown from '../Dropdown';
import Notification from './Notification';

function NavBar({ accessToken }: { accessToken?: boolean }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const signout = useSignout();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser({
          email: data.email,
          nickname: data.nickname,
          profileImage: data.profileImageUrl,
        });
      } catch (error) {
        console.error('유저 정보 불러오기 실패: ', error);
      }
    };

    loadUserProfile();
  }, [user]);

  const handleDropdownVisible = () => {
    setIsOpenMenu(!isOpenMenu);
  };

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
  };

  const modalRef = useClickOutside(handleModalClose);

  return (
    <div className="fixed left-0 right-0 top-0 z-10 border-b border-solid border-gray-300 bg-white">
      <div className="flex h-70 items-center justify-between p-20 lg:mx-auto lg:max-w-[1200px]">
        <Link href="/">
          <Image width={172} height={30} src="/assets/images/navbar-logo.svg" alt="네비바 로고" priority />
        </Link>
        {accessToken ? (
          <div className="flex items-center">
            <Notification />
            <div className="mx-12 h-22 border-l border-solid border-gray-300 md:mx-25" />
            <div className="relative flex items-center gap-10">
              <Image
                src={user.profileImage || '/assets/images/profile-image.png'}
                alt="프로필 이미지"
                className="rounded-full"
                width={32}
                height={32}
              />
              <div className="cursor-pointer text-md-medium text-black" onClick={handleDropdownVisible}>
                {user.nickname}
              </div>
              {isOpenMenu && (
                <DropDown classNames="h-max w-120 top-40 right-0 z-50">
                  <DropDown.Option className="" key="로그아웃" handleOptionClick={handleOptionClick} label="로그아웃" />
                  <DropDown.Option
                    className=""
                    key="마이페이지"
                    handleOptionClick={handleOptionClick}
                    label="마이페이지"
                  />
                </DropDown>
              )}
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

      {showLogoutModal && (
        <Modal.Overlay>
          <div ref={modalRef}>
            <Modal.RegisterConfirm onClose={handleModalClose}>로그아웃 되었습니다!</Modal.RegisterConfirm>
          </div>
        </Modal.Overlay>
      )}
    </div>
  );
}

export default NavBar;
