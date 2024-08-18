import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useKakaoAuth } from '@/components/pages/auth/useKakaoAuth';
import ErrorMessages from '@/constants/errorMessages';
import SuccessMessages from '@/constants/successMessages';
import { useClickOutside } from '@/hooks/useClickOutside';
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
    }
  };

  const modalRef = useClickOutside(handleModalClose);

  return (
    <>
      {isModalOpen && (
        <Modal.Overlay>
          <div ref={modalRef}>
            <Modal.RegisterConfirm onClose={handleModalClose}>
              {isLoading ? (
                <p>카카오 계정으로 로그인 중...</p>
              ) : isSuccess ? (
                SuccessMessages.SIGNIN_SUCCESS
              ) : error ? (
                <div className="flex flex-col items-center">
                  <p className="mb-4 text-red-200">{ErrorMessages.SIGNIN_ERROR}</p>
                  <Button.Default onClick={() => router.push('/signin')}>로그인 다시 시도하기</Button.Default>
                </div>
              ) : null}
            </Modal.RegisterConfirm>
          </div>
        </Modal.Overlay>
      )}
    </>
  );
};

export default KakaoAuthPage;
