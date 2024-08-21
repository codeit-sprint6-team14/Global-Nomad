import { completedReviewsAtom } from '@/store/completedReviewAtom';
import { modalAtom } from '@/store/modalAtom';
import { reservationIdAtom } from '@/store/reservationIdAtom';
import { reviewDataProps } from '@/types/reviewModalTypes';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';

import Header from './header';
import { usePostReviewMutation } from './hook/usePostReviewMutataion';
import StarRating from './starRating';
import TextareaWithSubmit from './textareaWithSubmit';

const Review = ({ title, bannerImageUrl, date, startTime, endTime, totalPrice, headCount }: reviewDataProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [, setModalType] = useAtom(modalAtom);
  const reservationId = useAtomValue(reservationIdAtom);
  const [, setCompletedReviews] = useAtom(completedReviewsAtom);
  const { mutate: postReviewData, error: postReviewError } = usePostReviewMutation();

  const handleSubmit = () => {
    if (rating > 0 && content.trim() && reservationId !== null) {
      postReviewData(
        { reservationId, reviewData: { rating, content } },
        {
          onSuccess: () => {
            setModalType(null);
            setCompletedReviews((prev) => [...prev, reservationId]);
          },
        },
      );
    }
  };

  return (
    <>
      {postReviewError && <div className="mb-4 text-red-500">{postReviewError.message}</div>}
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
          onSubmit={handleSubmit}
          isSubmitDisabled={rating === 0 || !content.trim()}
        />
      </div>
    </>
  );
};

export default Review;
