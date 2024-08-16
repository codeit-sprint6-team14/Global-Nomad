import LeftArrow from '@/../public/assets/icons/left-arrow.svg';
import { getUserProfile } from '@/apis/getUserProfile';
import { updateProfile } from '@/apis/updateProfile';
import Button from '@/components/common/Button';
import SideNavMenu from '@/components/common/SideNavMenu';
import useViewportSize from '@/hooks/useViewportSize';
import { confirmPasswordAtom, isChangedAtom, passwordAtom, userAtom } from '@/store/userAtom';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import InputSection from './inputSection';
import PasswordInputSection from './passwordInputSection';

const MyProfile = () => {
  const router = useRouter();
  const viewportSize = useViewportSize();
  const [user, setUser] = useAtom(userAtom);

  const [password, setPassword] = useAtom(passwordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);
  const [isChanged, setIsChanged] = useAtom(isChangedAtom);

  const [initialNickname, setInitialNickname] = useState<string>('');

  const passwordMismatch = password && password !== confirmPassword;
  const passwordLength = password.length < 8;

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser({
          email: data.email,
          nickname: data.nickname,
          profileImage: data.profileImageUrl,
        });
        setInitialNickname(data.nickname);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };

    loadUserProfile();
  }, [setUser]);

  useEffect(() => {
    const hasNicknameChanged = user.nickname !== initialNickname;
    const isPasswordLongEnough = password.length >= 8;
    const isPasswordValid = Boolean(password) && isPasswordLongEnough && password === confirmPassword;
    const isPasswordAttempted = Boolean(password) || Boolean(confirmPassword);

    const shouldEnableButton =
      (hasNicknameChanged && !isPasswordAttempted) || // 닉네임만 변경되고 비밀번호 변경 시도 없음
      (isPasswordValid && (hasNicknameChanged || !hasNicknameChanged)); // 비밀번호가 유효하고 (닉네임 변경 여부 상관없음)

    setIsChanged(shouldEnableButton);
  }, [user.nickname, initialNickname, password, confirmPassword, setIsChanged]);

  const handleSave = async () => {
    try {
      await updateProfile({
        nickname: user.nickname,
        profileImageUrl: user.profileImage,
        newPassword: password || undefined,
      });
      alert('변경 사항이 저장되었습니다.');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

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
            <Button.Default
              className={`ml-auto h-48 w-120 ${isChanged ? '' : 'cursor-not-allowed bg-gray-400'}`}
              onClick={handleSave}
              disabled={!isChanged}
            >
              저장하기
            </Button.Default>
          </div>
          <InputSection
            title="닉네임"
            value={user.nickname}
            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
          />
          <InputSection title="이메일" value={user.email} readonly={true} />
          <PasswordInputSection
            title="새 비밀번호"
            placeholder="8자 이상 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordLength && <p className="mt-4 text-sm text-red-500">8자 이상 입력해 주세요</p>}
          <PasswordInputSection
            title="비밀번호 재입력"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordMismatch && <p className="mt-4 text-sm text-red-500">비밀번호가 일치하지 않습니다</p>}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
