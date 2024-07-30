import Image from 'next/image';
import React, { useState } from 'react';

interface StarRatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
}

const StarRating = ({
  initialRating = 0,
  onChange,
}: StarRatingProps): JSX.Element => {
  const [rating, setRating] = useState(Math.round(initialRating));
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    if (onChange) {
      onChange(value);
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
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Image
              src={
                isFilled
                  ? './images/icon-star-filled.svg'
                  : './images/icon-star.svg'
              }
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
