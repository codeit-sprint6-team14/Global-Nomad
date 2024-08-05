import DropDown from '@/components/Dropdown';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// 테스트용 accessToken prop으로 로그인 상태, 로그아웃 상태 UI 테스트
function NavBar({ accessToken = true }: { accessToken?: boolean }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleDropdownVisible = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleOptionClick = (label: string) => {
    console.log(label); // 드롭다운 메뉴 클릭 시 실행할 로직을 추가
    setIsOpenMenu(false);
  };

  return (
    <div className="border-b border-solid border-gray-300 bg-white">
      <div className="flex h-70 items-center justify-between p-20 lg:mx-auto lg:max-w-[1200px]">
        <Link href="/">
          <Image width={172} height={30} src="/assets/images/navbar-logo.svg" alt="네비바 로고" priority />
        </Link>
        {accessToken ? (
          <div className="flex items-center">
            <Image src="/assets/icons/bell.svg" alt="네비바 알림 벨" width={20} height={20} />
            <div className="mx-12 h-22 border-l border-solid border-gray-300 md:mx-25" />
            <div className="relative flex items-center gap-10">
              <Image
                src="/assets/images/testImg/test-profile.svg"
                alt="프로필 이미지"
                className="rounded-full"
                width={32}
                height={32}
              />
              <div className="cursor-pointer text-md-medium text-black" onClick={handleDropdownVisible}>
                이영훈
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
            <div className="cursor-pointer text-md-medium text-black">로그인</div>
            <div className="cursor-pointer text-md-medium text-black">회원가입</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
