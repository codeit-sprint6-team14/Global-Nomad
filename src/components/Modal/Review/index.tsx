import reviewData from '@/mockData/reviewData';
import { useState } from 'react';

import Header from './header';
import StarRating from './starRating';
import TextareaWithSubmit from './textareaWithSubmit';

const Review = () => {
  const { title, bannerImageUrl, date, startTime, endTime, totalPrice, headCount } = reviewData;
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = () => {
    if (rating > 0 && reviewText.trim()) {
      // 제출 로직 부분
    }
  };

  return (
    <div className="w-full bg-white sm:px-16 md:rounded-24 md:px-24">
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
        text={reviewText}
        onTextChange={setReviewText}
        onSubmit={handleSubmit}
        isSubmitDisabled={rating === 0 || !reviewText.trim()}
      />
    </div>
  );
};

export default Review;
