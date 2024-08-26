import { useMyInformation } from '@/apis/ActivityDetailsPage/getMyInformation';
import FloatingBox from '@/components/common/FloatingBox';
import Modal from '@/components/common/Modal';
import { useReservationSubmit } from '@/components/pages/ActivityDetails/useReservationSubmit';
import useViewportSize from '@/hooks/useViewportSize';
import { activityIdAtom, reservationPriceAtom } from '@/store/activityDetailsAtom';
import { Activity } from '@/types/activity';
import { useSetAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import BannerImage from './bannerImage';
import ActivityDescription from './description';
import Header from './header';
import ReviewList from './reviewList';
import ScrollToTopButton from './scrollToTopButton';

const DynamicKakaoMap = dynamic(() => import('./kakaoMap'), {
  ssr: false,
  loading: () => <p>지도 로딩중...</p>,
});

const ActivityInformation = ({
  activityData,
  activityId,
  kakaoKey,
}: {
  activityData: Activity;
  activityId: string;
  kakaoKey: string;
}) => {
  const reviewListRef = useRef<HTMLDivElement>(null);

  const viewportSize = useViewportSize();

  const isMobile = viewportSize === 'mobile';
  const isTablet = viewportSize === 'tablet';

  const setPrice = useSetAtom(reservationPriceAtom);

  const setActivityId = useSetAtom(activityIdAtom);
  setActivityId(activityId);

  const {
    isModalOpen,
    isDeleteConfirmation,
    countdown,
    showCountdown,
    handleCloseModal,
    handleReservationSubmit,
    handleDeleteActivity,
    handleDeleteConfirmation,
    modalMessage,
  } = useReservationSubmit();

  const { userInformationData, isLoading: isLoadingUserData } = useMyInformation();

  if (isLoadingUserData) return <div>유저 데이터 로딩중입니다...</div>;

  const { category, title, rating, reviewCount, address, bannerImageUrl, description, subImages, price, userId } =
    activityData;

  setPrice(price);

  const hasAccessToken = localStorage.getItem('accessToken');

  const myId = userInformationData?.id;
  const isCreateByMe = myId === userId && hasAccessToken;

  const scrollToReviews = () => {
    reviewListRef.current?.scrollIntoView({ behavior: 'auto' });
  };

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
          scrollToReviews={scrollToReviews}
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
        <div ref={reviewListRef}>
          <ReviewList activityId={activityId} />
        </div>
        {isMobile && !isCreateByMe && (
          <div className="mt-89">
            <FloatingBox.Mobile handleReservationSubmit={handleReservationSubmit} />
          </div>
        )}
        {isModalOpen && (
          <Modal.Overlay isOpen={isModalOpen} onClose={isDeleteConfirmation ? handleDeleteActivity : handleCloseModal}>
            <Modal.RegisterConfirm
              onClose={isDeleteConfirmation ? handleDeleteActivity : handleCloseModal}
              onCancel={handleCloseModal}
              countdown={countdown}
              showCountdown={showCountdown}
              showCancelButton={isDeleteConfirmation}
            >
              {modalMessage}
            </Modal.RegisterConfirm>
          </Modal.Overlay>
        )}
        <div className="fixed bottom-170 right-10 flex lg:sticky lg:bottom-0 lg:right-0 lg:mb-20 lg:justify-end">
          <ScrollToTopButton />
        </div>
      </div>
    </>
  );
};

export default ActivityInformation;
