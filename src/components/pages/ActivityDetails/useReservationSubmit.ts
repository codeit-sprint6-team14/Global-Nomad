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
import { useEffect, useState } from 'react';

export const useReservationSubmit = () => {
  const router = useRouter();

  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);

  const [modalMessage, setModalMessage] = useState('');

  const [countdown, setCountdown] = useState(5);
  const [showCountdown, setShowCountdown] = useState(false);

  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

  const headCount = useAtomValue(headCountAtom);
  const activityId = useAtomValue(activityIdAtom);
  const scheduleId = useAtomValue(scheduleIdAtom);
  const selectedDate = useAtomValue(selectedDateAtom);
  const selectedSlot = useAtomValue(selectedSlotAtom);

  const { mutate: submitReservation, isPending, getErrorMessage } = useActivityReservationMutation();
  const { mutate: deleteReservation, getDeleteErrorMessage } = useDeleteActivityMutation();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCountdown && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, showCountdown]);

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
          const errorMessage = getErrorMessage(error);
          setModalMessage(errorMessage);
          setIsError(true);
          if (errorMessage === '로그인 후 이용해주세요.') {
            setIsUnauthorized(true);
          }
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
        setShowCountdown(true);
        setCountdown(5);
        setTimeout(() => {
          setIsModalOpen(false);
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
    setShowCountdown(false);

    if (isUnauthorized) {
      router.push('/signin');
      setIsUnauthorized(false);
    }
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
    countdown,
    showCountdown,
    isError,
    isPending,
    isModalOpen,
    isDeleteConfirmation,
    isReservationButtonDisabled,
  };
};
