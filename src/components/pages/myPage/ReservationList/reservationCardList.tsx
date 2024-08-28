import { MyReservation } from '@/apis/myPage/myReservations.types';
import ReservationCard from '@/components/common/Cards/reservationCard';
import Modal from '@/components/common/Modal';
import { modalAtom } from '@/store/modalAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';

const ReservationCardList = ({ myReservationsData }: { myReservationsData: MyReservation[] }) => {
  const [selectedReservation, setSelectedReservation] = useState<MyReservation | null>(null);

  const [modalType, setModalType] = useAtom(modalAtom);

  const handleCardClick = (myReservation: MyReservation) => {
    setSelectedReservation(myReservation);
  };
  const handleCloseModal = () => {
    setModalType(null);
  };
  return (
    <>
      <ul className="flex flex-col gap-8">
        {myReservationsData.map((myReservationData) => (
          <ReservationCard
            onCardClick={handleCardClick}
            key={myReservationData.id}
            myReservationData={myReservationData}
          />
        ))}
      </ul>
      <Modal.Overlay isOpen={modalType !== null} onClose={handleCloseModal}>
        {modalType === 'cancel' && <Modal.CancelConfirm />}
        {modalType === 'review' && selectedReservation && (
          <Modal.Review
            title={selectedReservation.activity.title}
            bannerImageUrl={selectedReservation.activity.bannerImageUrl || ''}
            date={selectedReservation.date}
            startTime={selectedReservation.startTime}
            endTime={selectedReservation.endTime}
            totalPrice={selectedReservation.totalPrice}
            headCount={selectedReservation.headCount}
          />
        )}
      </Modal.Overlay>
    </>
  );
};

export default ReservationCardList;
