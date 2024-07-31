import ExperienceCardProps from '@/types/cardResourceTypes';
import Image from 'next/image';

import Price from './price';
import Rating from './rating';

const StandardExperienceCard: React.FC<ExperienceCardProps> = ({ image, rating, reviewCount, title, price }) => {
  return (
    <div>
      <div className="relative h-168 w-168 overflow-hidden md:h-283 md:w-283">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="rounded-20" />
      </div>
      <Rating rating={rating} reviewCount={reviewCount} className="mt-10" reviewClassName="text-white" />
      <h2 className="my-5 w-168 break-words text-2lg-semibold md:my-15 md:w-280 md:text-2xl-semibold">{title}</h2>
      <Price price={price} className="mt-15 md:mt-20" />
    </div>
  );
};

export default StandardExperienceCard;
