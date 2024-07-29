import Image from 'next/image';

const CardImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="relative h-128 w-128 flex-shrink-0 md:h-156 md:w-156 lg:h-204 lg:w-204">
      <Image
        fill
        className="rounded-l-24"
        style={{ objectFit: 'cover' }}
        src={imageUrl}
        alt="카드 배너 이미지"
      />
    </div>
  );
};

export const CardImageType = (<CardImage imageUrl="" />).type;

export default CardImage;
