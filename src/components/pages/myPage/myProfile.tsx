import LeftArrow from '@/../public/assets/icons/left-arrow.svg';
import Button from '@/components/common/Button';
import SideNavMenu from '@/components/common/SideNavMenu';
import useViewportSize from '@/hooks/useViewportSize';
import { useRouter } from 'next/router';

import InputSection from './inputSection';
import PasswordInputSection from './passwordInputSection';

const MyProfile = () => {
  const router = useRouter();
  const viewportSize = useViewportSize();
  const handleGoMyPage = () => {
    router.push('/my-page');
  };

  const isSideNavbarOpen = viewportSize === 'tablet' || 'desktop';

  return (
    <div className="bg-gray-100">
      <div className="ml-auto mr-auto flex md:w-744 lg:w-1200">
        <div className="ml-30 mt-30">
          {isSideNavbarOpen && (
            <div className="hidden w-60 bg-white md:block">
              <SideNavMenu />
            </div>
          )}
        </div>
        <div className="mb-60 ml-auto mr-auto mt-30 w-343 md:mr-0 md:w-430 lg:w-750">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="block cursor-pointer md:hidden" onClick={handleGoMyPage}>
                <LeftArrow />
              </div>
              <h2 className="ml-10 mt-5 text-3xl-bold md:ml-0">내 정보</h2>
            </div>
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
