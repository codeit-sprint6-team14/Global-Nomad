import { Reservation } from '@/apis/myPage/myReservations.types';
import useToast from '@/hooks/useToast';
import { reservationIdAtom } from '@/store/reservationIdAtom';
import { isAxiosError } from 'axios';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

import Header from './header';
import { useReviewMutation } from './hook/useReviewMutation';
import StarRating from './starRating';
import TextareaWithSubmit from './textareaWithSubmit';

interface ReviewProps {
  selectedCard: Reservation;
  onClose: () => void;
}

const Review = ({ selectedCard, onClose }: ReviewProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const reservationId = useAtomValue(reservationIdAtom);
  const { mutate, error } = useReviewMutation();
  const toast = useToast();

  const handleSubmitReview = () => {
    if (rating > 0 && content.trim()) {
      mutate(
        { reservationId, reviewData: { rating, content } },
        {
          onSuccess: () => {
            onClose();
            toast.success('리뷰가 성공적으로 제출되었습니다.');
          },
          onError: (error) => {
            onClose();
            if (isAxiosError(error)) {
              switch (error.response?.status) {
                case 401:
                  toast.error('인증에 실패했습니다. 다시 로그인해주세요.');
                  break;
                case 403:
                  toast.error('본인의 예약만 리뷰를 작성할 수 있습니다.');
                  break;
                case 404:
                  toast.error('존재하지 않는 예약입니다.');
                  break;
                case 409:
                  toast.error('이미 리뷰를 작성했습니다.');
                  break;
                default:
                  toast.error('리뷰가 제출되지 못했습니다. 다시 시도해주세요.');
              }
            } else {
              toast.error('알 수 없는 오류가 발생했습니다.');
            }
          },
        },
      );
    }
  };

  const {
    activity: { title, bannerImageUrl },
    date,
    startTime,
    endTime,
    totalPrice,
    headCount,
  } = selectedCard;

  return (
    <>
      {error && <div className="mb-4 text-red-500">{error.message}</div>}
      <div className="h-full w-full bg-white sm:px-16 md:h-750 md:w-480 md:rounded-24 md:px-24">
        <Header
          title={title}
          bannerImageUrl={bannerImageUrl}
          date={date}
          startTime={startTime}
          endTime={endTime}
          totalPrice={totalPrice}
          headCount={headCount}
        />
        <div className="flex w-full justify-center sm:my-34 md:my-46">
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        <TextareaWithSubmit
          content={content}
          onContentChange={setContent}
          onSubmit={handleSubmitReview}
          isSubmitDisabled={rating === 0 || !content.trim()}
        />
      </div>
    </>
  );
};

export default Review;
