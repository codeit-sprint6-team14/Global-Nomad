import Star from '@/../public/svgs/star.svg';

interface RatingProps {
  rating: number;
  reviewCount: number;
  className?: string;
  reviewClassName?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewCount, className = '' }) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <Star />
      <p className="mt-4 text-lg-medium">
        {rating} <span className="${reviewClassName}">({reviewCount})</span>
      </p>
    </div>
  );
};

export default Rating;
