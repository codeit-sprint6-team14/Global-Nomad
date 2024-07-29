import Image from 'next/image';

type StandardExperienceCardProps = {
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
};
const StandardExperienceCard: React.FC<StandardExperienceCardProps> = ({
  rating,
  reviewCount,
  title,
  price,
}) => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <Image src="/images/star.svg" alt="rating" width={18} height={18} />
        <p className="mt-4 text-lg-medium">
          {rating} <span className="text-gray-500">({reviewCount})</span>
        </p>
      </div>
      <h2 className="my-5 w-168 break-words text-2lg-semibold md:my-15 md:w-280 md:text-2xl-semibold">
        {title}
      </h2>
      <p className="mt-15 text-xl-bold md:mt-20 md:text-2xl-bold">
        ₩ {price}
        <span className="mx-5 text-lg-regular text-gray-500 md:text-xl-regular">
          / 인
        </span>
      </p>
    </div>
  );
};

export default StandardExperienceCard;
