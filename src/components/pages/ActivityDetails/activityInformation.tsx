import { useActivityData } from '@/apis/ActivityDetailsPage/getActivityDetailsData';
import { useMyInformation } from '@/apis/ActivityDetailsPage/getMyInformation';
import FloatingBox from '@/components/common/FloatingBox';
import Modal from '@/components/common/Modal';
import ModalOverlay from '@/components/common/Modal/Overlay';
import { useReservationSubmit } from '@/components/pages/ActivityDetails/useReservationSubmit';
import { useClickOutside } from '@/hooks/useClickOutside';
import useViewportSize from '@/hooks/useViewportSize';
import { activityIdAtom, reservationPriceAtom } from '@/store/activityDetailsAtom';
import { useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';

import BannerImage from './bannerImage';
import ActivityDescription from './description';
import Header from './header';
import ReviewList from './reviewList';

const DynamicKakaoMap = dynamic(() => import('./kakaoMap'), {
  ssr: false,
  loading: () => <p>지도 로딩중...</p>,
});

const ActivityInformation = ({ activityId, kakaoKey }: { activityId: string; kakaoKey: string }) => {
  const viewportSize = useViewportSize();

  const isMobile = viewportSize === 'mobile';
  const isTablet = viewportSize === 'tablet';

  const setPrice = useSetAtom(reservationPriceAtom);

  const setActivityId = useSetAtom(activityIdAtom);
  setActivityId(activityId);

  const {
    handleReservationSubmit,
    handleCloseModal,
    isModalOpen,
    modalMessage,
    handleDeleteConfirmation,
    handleDeleteActivity,
    isDeleteConfirmation,
  } = useReservationSubmit();

  const modalRef = useClickOutside(handleCloseModal);

  const { userInformationData, isLoading: isLoadingUserData } = useMyInformation();
  const { activityData, isLoading: isLoadingActivityData, error } = useActivityData(activityId);

  if (isLoadingUserData || isLoadingActivityData) return <div>데이터 로딩중입니다...</div>;
  if (error) return <div>체험 상세 데이터를 불러오는데 실패했습니다.</div>;
  if (!activityData || !userInformationData) return <div>데이터를 불러오는데 실패했습니다.</div>;

  const { category, title, rating, reviewCount, address, bannerImageUrl, description, subImages, price, userId } =
    activityData;

  setPrice(price);

  const myId = userInformationData.id;
  const isCreateByMe = myId === userId;

  return (
    <>
      <div className="lg:mx-auto lg:max-w-[1200px] lg:pt-78">
        <Header
          myId={myId}
          title={title}
          userId={userId}
          rating={rating}
          address={address}
          category={category}
          activityId={activityId}
          reviewCount={reviewCount}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />

        <BannerImage bannerImageUrl={bannerImageUrl} subImages={subImages} />
        <div className="mx-24 flex justify-between md:pb-40 lg:mx-auto lg:max-w-[1200px]">
          <div className="flex w-full flex-col md:mr-24 md:pt-0">
            <ActivityDescription description={description} />
            <DynamicKakaoMap address={address} kakaoKey={kakaoKey} />
          </div>
          {!isMobile &&
            !isCreateByMe &&
            (isTablet ? (
              <FloatingBox.Tablet handleReservationSubmit={handleReservationSubmit} />
            ) : (
              <FloatingBox.Desktop
                classNames="sticky top-0 w-[384px]"
                handleReservationSubmit={handleReservationSubmit}
              />
            ))}
        </div>
        <ReviewList activityId={activityId} />
        {isMobile && !isCreateByMe && (
          <div className="mt-89">
            <FloatingBox.Mobile handleReservationSubmit={handleReservationSubmit} />
          </div>
        )}
        {isModalOpen && (
          <ModalOverlay>
            <div ref={modalRef}>
              <Modal.RegisterConfirm
                onClose={isDeleteConfirmation ? handleDeleteActivity : handleCloseModal}
                onCancel={handleCloseModal}
                showCancelButton={isDeleteConfirmation}
              >
                {modalMessage}
              </Modal.RegisterConfirm>
            </div>
          </ModalOverlay>
        )}
      </div>
    </>
  );
};

export default ActivityInformation;
