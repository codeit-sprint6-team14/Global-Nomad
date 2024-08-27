import Modal from '@/components/common/Modal';
import { useKakaoAuth } from '@/components/pages/auth/useKakaoAuth';
import ErrorMessages from '@/constants/errorMessages';
import SuccessMessages from '@/constants/successMessages';
import { useToggle } from '@/hooks/useToggle';
import { useRouter } from 'next/router';

const KakaoAuthPage = () => {
  const router = useRouter();
  const { isLoading, error, isSuccess, resetError } = useKakaoAuth();
  const { current: isModalOpen, handleToggle: toggleModal } = useToggle(true);

  const handleModalClose = () => {
    resetError();
    toggleModal();
    if (isSuccess) {
      router.push('/');
    } else {
      router.push('/signin');
    }
  };

  return (
    <>
      <Modal.Overlay isOpen={isModalOpen} onClose={handleModalClose}>
        <Modal.RegisterConfirm onClose={handleModalClose}>
          {isLoading ? (
            <p>카카오 계정으로 로그인 중...</p>
          ) : isSuccess ? (
            SuccessMessages.SIGNIN_SUCCESS
          ) : error && error.type === 'OTHER_ERROR' ? (
            <div className="flex flex-col items-center">
              <p className="mb-4 text-red-200">{ErrorMessages.SIGNIN_ERROR}</p>
              <p>{error.message}</p>
            </div>
          ) : (
            <p>카카오 계정으로 로그인 중...</p>
          )}
        </Modal.RegisterConfirm>
      </Modal.Overlay>
    </>
  );
};

export default KakaoAuthPage;
