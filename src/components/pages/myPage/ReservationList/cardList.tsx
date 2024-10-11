import { Reservation } from '@/apis/myPage/myReservations.types';
import Card from '@/components/common/Cards/reservationCard';
import Modal from '@/components/common/Modal';
import { modalAtom } from '@/store/modalAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';

const CardList = ({ list }: { list: Reservation[] }) => {
  const [selectedCard, setSelectedCard] = useState<Reservation | null>(null);
  const [modalType, setModalType] = useAtom(modalAtom);

  const handleCardClick = (card: Reservation) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    <>
      <ul className="flex flex-col gap-8">
        {list.map((data) => (
          <Card onCardClick={handleCardClick} key={data.id} data={data} />
        ))}
      </ul>
      <Modal.Overlay isOpen={modalType !== null} onClose={handleCloseModal}>
        {modalType === 'cancel' && <Modal.CancelConfirm />}
        {modalType === 'review' && selectedCard && (
          <Modal.Review
            title={selectedCard.activity.title}
            bannerImageUrl={selectedCard.activity.bannerImageUrl || ''}
            date={selectedCard.date}
            startTime={selectedCard.startTime}
            endTime={selectedCard.endTime}
            totalPrice={selectedCard.totalPrice}
            headCount={selectedCard.headCount}
          />
        )}
      </Modal.Overlay>
    </>
  );
};

export default CardList;
