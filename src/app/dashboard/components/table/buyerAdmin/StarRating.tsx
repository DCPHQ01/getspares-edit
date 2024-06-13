// components/StarRating.tsx

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

interface StarRatingProps {
  count: number;
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ count, rating, onRatingChange }) => {
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: count }, (_, index) => index + 1).map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={star <= (hover || rating) ? filledStar : emptyStar}
          className="text-yellow-500 cursor-pointer"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
};

export default StarRating;
