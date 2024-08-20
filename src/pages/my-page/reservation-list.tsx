import Footer from '@/components/common/Footer';
import Modal from '@/components/common/Modal';
import NavBar from '@/components/common/NavBar';
import SideNavMenu from '@/components/common/SideNavMenu';
import { useMyReservationsQuery } from '@/components/pages/myPage/ReservationList/hooks/useMyReservationsQuery';
import ReservationContent from '@/components/pages/myPage/ReservationList/reservationContent';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useDeviceState } from '@/hooks/useDeviceState';
import { modalAtom } from '@/store/modalAtom';
import { Device } from '@/types/deviceTypes';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const ReservationList = () => {
  const [modalType, setModalType] = useAtom(modalAtom);
  const deviceState = useDeviceState();
  const isMobile = deviceState === Device.MOBILE;
  const isTablet = deviceState === Device.TABLET;
  const isDesktop = deviceState === Device.DESKTOP;

  const {
    myReservationsData,
    isMyReservationsEmpty,
    error: queryError,
    setTarget,
    handleStatusChange,
    selectedStatus,
  } = useMyReservationsQuery();

  const handleCloseModal = () => {
    setModalType(null);
  };

  const modalRef = useClickOutside(handleCloseModal);

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();

    // 모달 열려있는 경우 스크롤바 숨기는 로직
    if (modalType) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [modalType]);

  return (
    <>
      <NavBar />
      {queryError && <div className="mb-4 text-red-500">{queryError.message}</div>}
      <main className="mx-auto mb-94 mt-94 w-344 md:w-696 lg:mb-142 lg:mt-142 lg:w-1200">
        {isMobile && (
          <ReservationContent
            myReservationsData={myReservationsData}
            isEmpty={isMyReservationsEmpty}
            onStatusChange={handleStatusChange}
            selectedStatus={selectedStatus}
          />
        )}
        {(isTablet || isDesktop) && (
          <div className="flex justify-between">
            <SideNavMenu />
            <ReservationContent
              myReservationsData={myReservationsData}
              showFilter={isDesktop}
              isEmpty={isMyReservationsEmpty}
              onStatusChange={handleStatusChange}
              selectedStatus={selectedStatus}
            />
          </div>
        )}
        {modalType === 'cancel' && (
          <Modal.Overlay>
            <div ref={modalRef}>
              <Modal.CancelConfirm />
            </div>
          </Modal.Overlay>
        )}
        {modalType === 'review' && (
          <Modal.Overlay>
            <div ref={modalRef} className="h-full md:h-auto md:w-auto">
              <Modal.Review
                title="함께 배우면 즐거운 스트릿 댄스"
                bannerImageUrl="/images/test-profile-img.png"
                date="2023. 2. 14"
                startTime="11:00"
                endTime="12:30"
                totalPrice={10000}
                headCount={10}
              />
            </div>
          </Modal.Overlay>
        )}
        <div ref={setTarget}></div>
      </main>
      <Footer />
    </>
  );
};

export default ReservationList;
