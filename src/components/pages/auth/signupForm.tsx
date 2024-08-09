import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { SignupFormData } from '@/types/formTypes';
import { signupValidationSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupValidationSchema),
    mode: 'onChange',
  });

  const onSubmit = () => {
    // 회원가입 로직 추가 예정
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 sm:w-350 md:w-640">
      <label htmlFor="email">이메일</label>
      <Input
        id="email"
        type="email"
        isAuth
        placeholder="이메일을 입력해 주세요"
        register={register('email')}
        error={!!errors.email}
      />
      {errors.email && <span className="block text-xs-regular text-red-200">{errors.email.message}</span>}

      <label htmlFor="nickname" className="mt-20">
        닉네임
      </label>
      <Input
        id="nickname"
        type="text"
        isAuth
        placeholder="닉네임을 입력해 주세요"
        register={register('nickname')}
        error={!!errors.nickname}
      />
      {errors.nickname && <span className="block text-xs-regular text-red-200">{errors.nickname.message}</span>}

      <label htmlFor="password" className="mt-20">
        비밀번호
      </label>
      <Input.Password
        id="password"
        placeholder="8자 이상 입력해 주세요"
        register={register('password')}
        error={'password' in errors}
      />
      {errors.password && <span className="block text-xs-regular text-red-200">{errors.password.message}</span>}

      <label htmlFor="passwordConfirmation" className="mt-20">
        비밀번호 확인
      </label>
      <Input.Password
        id="passwordConfirmation"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        register={register('passwordConfirmation')}
        error={!!errors.passwordConfirmation}
      />
      {errors.passwordConfirmation && (
        <span className="block text-xs-regular text-red-200">{errors.passwordConfirmation.message}</span>
      )}

      <Button.Default type="submit" className="mt-28 h-48 w-full" disabled={!isValid}>
        회원가입 하기
      </Button.Default>
    </form>
  );
};

export default SignupForm;
