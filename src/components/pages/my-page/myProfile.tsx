import Button from '@/components/common/Button';
import SideNavMenu from '@/components/common/SideNavMenu';
import { useEffect, useState } from 'react';

import InputSection from './inputSection';
import PasswordInputSection from './passwordInputSection';

const MyProfile = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // 태블릿 사이즈 이상의 화면에서 true
    };

    handleResize(); // 초기 렌더링 시 체크
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="bg-gray-100">
      <div className="ml-auto mr-auto flex md:w-744 lg:w-1200">
        <div className="ml-30 mt-30">
          {isDesktop && (
            <div className="hidden w-60 bg-white md:block">
              <SideNavMenu />
            </div>
          )}
        </div>
        <div className="mb-60 ml-auto mr-auto mt-30 w-343 md:mr-0 md:w-430 lg:w-750">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl-bold">내 정보</h2>
            <Button.Default className="ml-auto h-48 w-120">저장하기</Button.Default>
          </div>
          <InputSection title="닉네임" />
          <InputSection title="이메일" />
          <PasswordInputSection title="비밀번호" placeholder="8자 이상 입력해 주세요" />
          <PasswordInputSection title="비밀번호 재입력" placeholder="비밀번호를 한 번 더 입력해 주세요" />
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
