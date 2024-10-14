import { Reservation } from '@/apis/myPage/myReservations.types';
import Card from '@/components/common/Cards/reservationCard';
import Modal from '@/components/common/Modal';
import { modalAtom } from '@/store/modalAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';

interface CardListProps {
  list: Reservation[];
}

const CardList = ({ list }: CardListProps) => {
  const [selectedCard, setSelectedCard] = useState<Reservation | null>(null);
  const [modalType, setModalType] = useAtom(modalAtom);

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedCard(null);
  };

  const handleCardClick = (card: Reservation) => {
    setSelectedCard(card);
  };

  const modalContent = () => {
    if (!modalType) return null;

    switch (modalType) {
      case 'cancel':
        return <Modal.CancelConfirm />;
      case 'review':
        return selectedCard ? <Modal.Review selectedCard={selectedCard} onClose={handleCloseModal} /> : null;
      default:
        return null;
    }
  };

  return (
    <>
      <ul className="flex flex-col gap-8">
        {list.map((data) => (
          <Card onCardClick={handleCardClick} key={data.id} data={data} />
        ))}
      </ul>
      <Modal.Overlay isOpen={!!modalType} onClose={handleCloseModal}>
        {modalContent()}
      </Modal.Overlay>
    </>
  );
};

export default CardList;
