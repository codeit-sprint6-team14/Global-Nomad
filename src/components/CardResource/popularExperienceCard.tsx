import Image from 'next/image';

import Star from '../../../public/images/star.svg';

type PopularExperienceCardProps = {
  image: string;
  rating: number;
  reviewCount: number;
  title: string;
  price: number;
};
const PopularExperienceCard: React.FC<PopularExperienceCardProps> = ({ image, rating, reviewCount, title, price }) => {
  return (
    <div className="relative isolate h-184 w-186 gap-10 p-20 md:h-384 md:w-384">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="rounded-20" />
      </div>
      <div className="absolute inset-0 rounded-20 bg-gradient-to-b from-transparent via-black/80 to-black/80"></div>
      <div className="z-2 relative mt-30 md:mt-150">
        <div className="flex items-center gap-5">
          <Star />

          <p className="mt-4 text-md-semibold text-white">
            {rating} ({reviewCount})
          </p>
        </div>
        <h2 className="my-5 w-146 break-words text-2lg-bold text-white md:my-20 md:w-250 md:text-3xl-bold">{title}</h2>
        <p className="text-lg-bold text-white md:text-xl-bold">
          ₩ {price}
          <span className="mx-5 text-md-regular text-gray-500 md:text-md-regular">/ 인</span>
        </p>
      </div>
    </div>
  );
};

export default PopularExperienceCard;
