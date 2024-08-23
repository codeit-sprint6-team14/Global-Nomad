import Modal from '@/components/common/Modal';
import { useGoogleAuth } from '@/components/pages/auth/useGoogleAuth';
import ErrorMessages from '@/constants/errorMessages';
import SuccessMessages from '@/constants/successMessages';
import { useToggle } from '@/hooks/useToggle';
import { useRouter } from 'next/router';

const GoogleAuthPage = () => {
  const router = useRouter();
  const { isLoading, error, isSuccess, resetError } = useGoogleAuth();
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
      <Modal.Overlay onClose={handleModalClose} isOpen={isModalOpen}>
        <Modal.RegisterConfirm onClose={handleModalClose}>
          {isLoading ? (
            <p>Google 계정으로 로그인 중...</p>
          ) : isSuccess ? (
            SuccessMessages.SIGNIN_SUCCESS
          ) : error ? (
            <div className="flex flex-col items-center">
              <p className="mb-4 text-red-200">{ErrorMessages.SIGNIN_ERROR}</p>
              <p>로그인을 다시 시도해주세요.</p>
            </div>
          ) : null}
        </Modal.RegisterConfirm>
      </Modal.Overlay>
    </>
  );
};

export default GoogleAuthPage;
