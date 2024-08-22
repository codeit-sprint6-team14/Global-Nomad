import AnimatedContainer from '@/components/common/Animation/AnimatedContainer';
import Footer from '@/components/common/Footer';
import Modal from '@/components/common/Modal';
import NavBar from '@/components/common/NavBar';
import SideNavMenu from '@/components/common/SideNavMenu';
import { useMyReservationsQuery } from '@/components/pages/myPage/ReservationList/hooks/useMyReservationsQuery';
import ReservationContent from '@/components/pages/myPage/ReservationList/reservationContent';
import { useDeviceState } from '@/hooks/useDeviceState';
import { modalAtom } from '@/store/modalAtom';
import { Device } from '@/types/deviceTypes';
import { useAtom } from 'jotai';

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

  return (
    <>
      <NavBar />
      <AnimatedContainer>
        <main className="md:mb-400 lg:mb-270 mx-auto mb-[496px] mt-94 w-344 md:w-696 lg:mb-142 lg:mt-142 lg:w-1200">
          {queryError && <div className="mb-4 text-red-500">{queryError.message}</div>}
          {isMobile && (
            <div>
              <ReservationContent
                myReservationsData={myReservationsData}
                isEmptyMyReservationData={isMyReservationsEmpty}
                onStatusChange={handleStatusChange}
                selectedStatus={selectedStatus}
              />
            </div>
          )}
          {(isTablet || isDesktop) && (
            <div className="flex justify-between">
              <SideNavMenu />
              <div>
                <ReservationContent
                  myReservationsData={myReservationsData}
                  showFilter={isDesktop}
                  isEmptyMyReservationData={isMyReservationsEmpty}
                  onStatusChange={handleStatusChange}
                  selectedStatus={selectedStatus}
                />
              </div>
            </div>
          )}
          <Modal.Overlay isOpen={modalType !== null} onClose={handleCloseModal}>
            {modalType === 'cancel' && <Modal.CancelConfirm />}
            {modalType === 'review' && (
              <Modal.Review
                title="함께 배우면 즐거운 스트릿 댄스"
                bannerImageUrl="/images/test-profile-img.png"
                date="2023. 2. 14"
                startTime="11:00"
                endTime="12:30"
                totalPrice={10000}
                headCount={10}
              />
            )}
          </Modal.Overlay>
          <div ref={setTarget}></div>
        </main>
      </AnimatedContainer>
      <Footer />
    </>
  );
};

export default ReservationList;
