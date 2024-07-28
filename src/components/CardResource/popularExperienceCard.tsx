import Image from 'next/image';

const PopularExperienceCard: React.FC = () => {
  return (
    <div className="m-10">
      <div className="relative isolate h-184 w-186 gap-10 rounded-20 bg-gradient-to-b from-transparent via-black/80 to-black/80 p-20 md:h-384 md:w-384">
        <div className="mt-30 md:mt-150">
          <div className="flex items-center gap-5">
            <Image src="/images/star.svg" alt="rating" width={18} height={18} />
            <p className="mt-4 text-md-semibold text-white">4.9 (293)</p>
          </div>
          <h2 className="my-5 w-146 break-words text-2lg-bold text-white md:my-20 md:w-250 md:text-3xl-bold">
            함께 배우면 즐거운 스트릿 댄스
          </h2>
          <p className="text-lg-bold text-white md:text-xl-bold">
            ₩ 38,000
            <span className="mx-5 text-md-regular text-gray-500 md:text-md-regular">
              / 인
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularExperienceCard;
