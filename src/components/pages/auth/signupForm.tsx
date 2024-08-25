import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import SuccessMessages from '@/constants/successMessages';
import { useToggle } from '@/hooks/useToggle';
import { SignupFormData } from '@/types/auth';
import { usePasswordStrength } from '@/utils/calculatePassword';
import { signupValidationSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import Terms from './terms';
import { useSignup } from './useSignup';

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupValidationSchema),
    mode: 'onChange',
  });

  const { handleSignup, isLoading, error, resetError, isSuccess } = useSignup();
  const { current: isModalOpen, handleToggle: toggleModal } = useToggle(false);
  const { current: isTermsModalOpen, handleToggle: toggleTermsModal } = useToggle(false);

  const password = watch('password');
  const { strength, getStrengthColor, getStrengthText } = usePasswordStrength(password || '');

  const onSubmitUserData = async (data: SignupFormData) => {
    handleSignup(data);
    toggleModal();
  };

  const handleModalClose = () => {
    resetError();
    toggleModal();
    if (isSuccess) {
      router.push('/signin');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitUserData)} className="flex flex-col gap-8 sm:w-350 md:w-640">
        {/* 이메일 필드 */}
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
        {/* 닉네임 필드 */}
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
        {/* 비밀번호 필드 */}
        <label htmlFor="password" className="mt-20">
          비밀번호
        </label>
        <Input.Password
          id="password"
          placeholder="8자 이상 입력해 주세요"
          register={register('password')}
          error={'password' in errors}
        />
        <div className="flex justify-between">
          {errors.password ? (
            <span className="block text-xs-regular text-red-200">{errors.password.message}</span>
          ) : (
            <span> </span>
          )}
          {/* 비밀번호 강도 표시 */}
          <div className="mt-2">
            <div className="h-2 w-90 rounded-full bg-gray-200">
              <div className={`h-full rounded-full ${getStrengthColor()}`} style={{ width: `${strength}%` }}></div>
            </div>
            <span className="mt-1 text-xs-regular">{`비밀번호 강도: ${getStrengthText()}`}</span>
          </div>
        </div>

        {/* 비밀번호 확인 필드 */}
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
        {/* 이용약관 동의 */}
        <div className="mt-20 flex items-center">
          <input type="checkbox" id="terms" className="mr-2" {...register('termsAgreed')} />
          <label htmlFor="terms" className="text-md-regular">
            이용약관에 동의합니다.
          </label>
          <button type="button" onClick={toggleTermsModal} className="ml-4 text-sm text-blue-500 underline">
            자세히 보기
          </button>
        </div>
        {errors.termsAgreed && <span className="block text-xs-regular text-red-200">{errors.termsAgreed.message}</span>}
        {/* 회원가입 버튼 */}
        <Button.Default type="submit" className="mt-28 h-48 w-full" disabled={!isValid || isLoading}>
          {isLoading ? '처리 중...' : '회원가입 하기'}
        </Button.Default>
      </form>

      {/* 회원가입 완료 모달 */}
      <Modal.Overlay onClose={handleModalClose} isOpen={isModalOpen}>
        <Modal.RegisterConfirm onClose={handleModalClose}>
          {isSuccess ? SuccessMessages.SIGNUP_SUCCESS : error}
        </Modal.RegisterConfirm>
      </Modal.Overlay>

      {/* 이용약관 모달 */}
      <Modal.Overlay onClose={toggleTermsModal} isOpen={isTermsModalOpen}>
        <Terms onClose={toggleTermsModal} />
      </Modal.Overlay>
    </>
  );
};

export default SignupForm;
