import { StarRatingProps } from '@/types/reviewModalTypes';
import Image from 'next/image';
import React, { useState } from 'react';

const StarRating = ({ rating = 0, onRatingChange }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  const handleRatings = (value: number) => {
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-10">
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFilled = starValue <= (hover || rating);
        return (
          <div
            key={starValue}
            className="relative h-56 w-56 cursor-pointer"
            onClick={() => handleRatings(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Image
              src={isFilled ? '/assets/icons/star-filled.svg' : '/assets/icons/star-empty.svg'}
              alt={isFilled ? 'Filled star' : 'Empty star'}
              layout="fill"
              objectFit="contain"
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
