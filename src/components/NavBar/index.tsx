import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import Dropdown from '@/components/NavBar/dropDown'

function NavBar() {
  // 테스트용 accessToken state 만들어서 로그인 상태, 로그아웃 상태 UI 테스트
  const [accessToken] = useState(true)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleDropdownVisible = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <div className="bg-white border-b border-solid border-gray-300">
      <div className="h-70 p-20  flex items-center justify-between lg:mx-auto lg:max-w-[1200px]">
        <Link href="/">
          <Image
            width={172}
            height={30}
            src="/images/navbar-logo.svg"
            alt="네비바 로고"
            priority
          />
        </Link>
        {accessToken ? (
          <div className="flex items-center">
            <Image
              src="images/ic-bell.svg"
              alt="네비바 알림 벨"
              width={20}
              height={20}
            />
            <div className="border-l mx-12 border-solid md:mx-25 border-gray-300 h-22" />
            <div className="relative flex gap-10 items-center">
              <Image
                src="images/ic-test-profile.svg"
                alt="프로필 이미지"
                width={32}
                height={32}
              />
              <div
                className="text-md-medium cursor-pointer text-black"
                onClick={handleDropdownVisible}
              >
                이영훈
              </div>
              {isOpenMenu && <Dropdown />}
            </div>
          </div>
        ) : (
          <div className="flex gap-24">
            <div className="text-md-medium text-black">로그인</div>
            <div className="text-md-medium text-black">회원가입</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
