import Image from 'next/image';

const StandardExperienceCard: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <Image src="/images/star.svg" alt="rating" width={18} height={18} />
        <p className="mt-4 text-lg-medium">
          4.9 <span className="text-gray-500">(108)</span>
        </p>
      </div>
      <h2 className="my-5 w-168 break-words text-2lg-semibold md:my-15 md:w-280 md:text-2xl-semibold">
        해안가 마을에서 1주일 살아보기
      </h2>
      <p className="mt-15 text-xl-bold md:mt-20 md:text-2xl-bold">
        ₩ 38,000
        <span className="mx-5 text-lg-regular text-gray-500 md:text-xl-regular">
          / 인
        </span>
      </p>
    </div>
  );
};

export default StandardExperienceCard;
