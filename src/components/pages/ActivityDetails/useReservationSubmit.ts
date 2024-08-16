import { useDeleteActivityMutation } from '@/apis/ActivityDetailsPage/deleteActivity';
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
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useReservationSubmit = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  const activityId = useAtomValue(activityIdAtom);
  const scheduleId = useAtomValue(scheduleIdAtom);
  const headCount = useAtomValue(headCountAtom);
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedSlot = useAtomValue(selectedSlotAtom);

  const { mutate: submitReservation, isPending, getErrorMessage } = useActivityReservationMutation();
  const { mutate: deleteReservation, getDeleteErrorMessage } = useDeleteActivityMutation();

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

  const handleDeleteConfirmation = () => {
    setModalMessage('정말 삭제하시겠습니까?');
    setIsDeleteConfirmation(true);
    setIsModalOpen(true);
  };

  const handleDeleteActivity = () => {
    deleteReservation(activityId, {
      onSuccess: () => {
        setModalMessage('체험이 삭제되었습니다.');
        setIsError(false);
        setIsModalOpen(true);
        setIsDeleteConfirmation(false);
        setTimeout(() => {
          router.push('/');
        }, 5000);
      },
      onError: (error) => {
        setModalMessage(getDeleteErrorMessage(error));
        setIsError(true);
        setIsModalOpen(true);
        setIsDeleteConfirmation(false);
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
    setIsError(false);
    setIsDeleteConfirmation(false);
  };

  const isReservationButtonDisabled = !selectedDate || !selectedSlot || headCount <= 0;

  return {
    handleReservationSubmit,
    handleDeleteConfirmation,
    handleDeleteActivity,
    handleCloseModal,
    modalMessage,
    selectedDate,
    selectedSlot,
    isError,
    isPending,
    isModalOpen,
    isDeleteConfirmation,
    isReservationButtonDisabled,
  };
};
