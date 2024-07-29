import Image from 'next/image';

const CardHeader = ({
  text,
  imgSrc,
  cardType,
}: {
  text: string;
  imgSrc?: string;
  cardType: 'reservation' | 'myActivity';
}) => {
  return (
    <div className="flex">
      {imgSrc && (
        <div className="relative mr-6 h-16 w-16">
          <Image src={imgSrc} alt="별점 이미지" fill />
        </div>
      )}
      <div
        className={`${cardType === 'reservation' ? 'text-md-bold md:text-lg-bold' : 'text-md-regular'}`}
      >
        {text}
      </div>
    </div>
  );
};

export default CardHeader;
