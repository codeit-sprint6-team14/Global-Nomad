import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useToggle } from '@/hooks/useToggle';
import { SignupFormData } from '@/types/auth';
import { signupValidationSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useSignup } from './useSignup';

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupValidationSchema),
    mode: 'onChange',
  });

  const { handleSignup, isLoading, error, resetError, isSuccess } = useSignup();
  const { current: isModalOpen, handleToggle: toggleModal } = useToggle(false);

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

  const modalRef = useClickOutside(handleModalClose);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitUserData)} className="flex flex-col gap-8 sm:w-350 md:w-640">
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

        <Button.Default type="submit" className="mt-28 h-48 w-full" disabled={!isValid || isLoading}>
          {isLoading ? '처리 중...' : '회원가입 하기'}
        </Button.Default>
      </form>
      {isModalOpen && (
        <Modal.Overlay>
          <div ref={modalRef}>
            <Modal.RegisterConfirm onClose={handleModalClose}>
              {isSuccess ? '가입이 완료되었습니다!' : error}
            </Modal.RegisterConfirm>
          </div>
        </Modal.Overlay>
      )}
    </>
  );
};

export default SignupForm;
