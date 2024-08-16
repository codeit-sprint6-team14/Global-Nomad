import { useActivityReservationMutation } from '@/apis/ActivityDetailsPage/postActivityReservation';
import {
  activityIdAtom,
  headCountAtom,
  isModalOpenAtom,
  scheduleIdAtom,
  selectedDateAtom,
  selectedSlotAtom,
} from '@/store/activityDetailsAtom';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';

export const useReservationSubmit = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const activityId = useAtomValue(activityIdAtom);
  const scheduleId = useAtomValue(scheduleIdAtom);
  const headCount = useAtomValue(headCountAtom);
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedSlot = useAtomValue(selectedSlotAtom);

  const { mutate: submitReservation, isPending, getErrorMessage } = useActivityReservationMutation();

  const handleReservationSubmit = () => {
    submitReservation(
      { activityId, scheduleId, headCount },
      {
        onSuccess: () => {
          setModalMessage('예약이 완료됐습니다.');
          setIsError(false);
          setIsModalOpen(true);
        },
        onError: (error) => {
          setModalMessage(getErrorMessage(error));
          setIsError(true);
          setIsModalOpen(true);
        },
      },
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
    setIsError(false);
  };

  const isReservationButtonActive = selectedDate && selectedSlot && headCount > 0 ? false : true;

  return {
    handleReservationSubmit,
    handleCloseModal,
    selectedDate,
    selectedSlot,
    isReservationButtonActive,
    isPending,
    isModalOpen,
    modalMessage,
    isError,
  };
};
