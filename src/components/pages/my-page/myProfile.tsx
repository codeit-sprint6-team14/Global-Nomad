import Button from '@/components/common/Button';

import InputSection from './inputSection';
import PasswordInputSection from './passwordInputSection';

const MyProfile = () => {
  return (
    <div className="bg-gray-100">
      <div className="mb-60 ml-auto mr-auto mt-30 w-343">
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
  );
};
export default MyProfile;
