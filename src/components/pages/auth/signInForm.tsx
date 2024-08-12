import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useSignin } from '@/hooks/useSignin';
import { SigninData } from '@/types/auth';
import { signinValidationSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninData>({
    resolver: yupResolver(signinValidationSchema),
    mode: 'onChange',
  });

  const { handleSignin, isLoading, error, resetError } = useSignin();

  const onSigninSubmit = (data: SigninData) => {
    handleSignin(data);
  };

  const handleModalClose = () => {
    resetError();
  };

  const modalRef = useClickOutside(handleModalClose);

  return (
    <>
      <form onSubmit={handleSubmit(onSigninSubmit)} className="flex flex-col gap-8 sm:w-350 md:w-640">
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

        <Button.Default type="submit" className="mt-28 h-48 w-full" disabled={!isValid || isLoading}>
          {isLoading ? '로그인 중...' : '로그인 하기'}
        </Button.Default>
      </form>

      {error && (
        <Modal.Overlay>
          <div ref={modalRef}>
            <Modal.RegisterConfirm onClose={handleModalClose}>{error}</Modal.RegisterConfirm>
          </div>
        </Modal.Overlay>
      )}
    </>
  );
};

export default SignInForm;
