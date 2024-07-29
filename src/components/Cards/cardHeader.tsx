import Image from 'next/image';

const CardHeader = ({
  text,
  imgSrc,
  textClassNames,
}: {
  text: string;
  imgSrc?: string;
  textClassNames?: string;
}) => {
  return (
    <div className="flex">
      {imgSrc && (
        <div className="relative mr-6 h-16 w-16">
          <Image src={imgSrc} alt="별점 이미지" fill />
        </div>
      )}
      <div className={`${textClassNames ?? 'text-md-regular'}`}>{text}</div>
    </div>
  );
};

export const CardHeaderType = (<CardHeader text="" />).type;

export default CardHeader;
