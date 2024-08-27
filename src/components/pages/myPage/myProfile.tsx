import LeftArrow from '@/../public/assets/icons/left-arrow.svg';
import { getUserProfile, updateProfile } from '@/apis/myPage/myProfile';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
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

  const [localNickname, setLocalNickname] = useState('');
  const [initialNickname, setInitialNickname] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [isSocialUser, setIsSocialUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const passwordMismatch = confirmPassword && password !== confirmPassword;
  const passwordLength = password.length < 8 && password.length > 0;

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      try {
        const data = await getUserProfile();
        setUser({
          email: data.email,
          nickname: data.nickname,
          profileImage: data.profileImageUrl,
        });
        setInitialNickname(data.nickname);
        setLocalNickname(data.nickname);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();

    // 로컬 스토리지에서 social 키 확인
    const social = localStorage.getItem('social');
    if (social === 'true') {
      setIsSocialUser(true);
    }
  }, [setUser]);

  useEffect(() => {
    const hasNicknameChanged = localNickname !== initialNickname;
    const isPasswordLongEnough = password.length >= 8;
    const isPasswordValid = Boolean(password) && isPasswordLongEnough && password === confirmPassword;
    const isPasswordAttempted = Boolean(password) || Boolean(confirmPassword);

    const shouldEnableButton =
      (hasNicknameChanged && !isPasswordAttempted) || // 닉네임만 변경되고 비밀번호 변경 시도 없음
      (isPasswordValid && (hasNicknameChanged || !hasNicknameChanged)); // 비밀번호가 유효하고 (닉네임 변경 여부 상관없음)

    setIsChanged(shouldEnableButton);
  }, [localNickname, initialNickname, password, confirmPassword, setIsChanged]);

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        nickname: localNickname,
        profileImageUrl: user.profileImage,
        newPassword: password || undefined,
      });
      setUser({ ...user, nickname: localNickname }); // 저장 성공 시에만 userAtom 업데이트
      setModalMessage('변경 사항이 저장되었습니다');
      setIsModalOpen(true);
      setInitialNickname(localNickname); // 초기 닉네임 업데이트
    } catch (error) {
      console.error('Failed to update profile:', error);
      setModalMessage('프로필 업데이트에 실패했습니다');
      setIsModalOpen(true);
    }
  };

  const handleGoMyPage = () => {
    router.push('/my-page');
  };

  const isSideNavbarOpen = viewportSize === 'tablet' || 'desktop';

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <main className="md:mb-363 lg:mb-208 mb-168 pt-94 lg:pt-142">
      <div className="mx-auto flex justify-between md:w-696 lg:w-1200">
        {isSideNavbarOpen && (
          <nav className="hidden bg-white md:block">
            <SideNavMenu />
          </nav>
        )}
        <div className="mx-auto mb-60 w-343 md:mx-0 md:w-429 lg:w-792">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="block cursor-pointer md:hidden" onClick={handleGoMyPage}>
                <LeftArrow />
              </div>
              <h1 className="ml-10 mt-5 text-3xl-bold md:ml-0">내 정보</h1>
            </div>
            <Button.Default
              className={`ml-auto h-48 w-120 ${isChanged ? '' : 'cursor-not-allowed bg-gray-400'}`}
              onClick={handleSave}
              disabled={!isChanged}
            >
              저장하기
            </Button.Default>
          </div>
          <InputSection title="닉네임" value={localNickname} onChange={(e) => setLocalNickname(e.target.value)} />
          <InputSection title="이메일" value={user.email} readonly={true} />
          <PasswordInputSection
            title="새 비밀번호"
            placeholder="8자 이상 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            readonly={isSocialUser}
          />
          {passwordLength && !isSocialUser && <p className="mt-4 text-sm text-red-500">8자 이상 입력해 주세요</p>}
          <PasswordInputSection
            title="비밀번호 재입력"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            readonly={isSocialUser}
          />
          {passwordMismatch && confirmPassword && !isSocialUser && (
            <p className="mt-4 text-sm text-red-500">비밀번호가 일치하지 않습니다</p>
          )}
        </div>
      </div>

      {/* 모달 조건부 렌더링 */}
      <Modal.Overlay isOpen={isModalOpen} onClose={handleModalClose}>
        <Modal.RegisterConfirm onClose={handleModalClose}>{modalMessage}</Modal.RegisterConfirm>
      </Modal.Overlay>
    </main>
  );
};

export default MyProfile;
