import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import React from 'react';

const SignupForm = () => {
  return (
    <form className="flex flex-col gap-8 sm:w-350 md:w-640">
      <label>이메일</label>
      <Input type="email" isAuth placeholder="이메일을 입력해 주세요" />
      <label className="mt-20">닉네임</label>
      <Input type="text" isAuth placeholder="닉네임을 입력해 주세요" />
      <label className="mt-20">비밀번호</label>
      <Input.Password isAuth placeholder="8자 이상 입력해 주세요" />
      <label className="mt-20">비밀번호 확인</label>
      <Input.Password isAuth placeholder="비밀번호를 한번 더 입력해 주세요" />
      <Button.Default className="mt-28 h-48 w-full">회원가입 하기</Button.Default>
    </form>
  );
};

export default SignupForm;
