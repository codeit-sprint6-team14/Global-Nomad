import Image from 'next/image';

const CardHeader = ({ text, imgSrc, ClassNames }: { text: string; imgSrc?: string; ClassNames?: string }) => {
  return (
    <div className="flex">
      {imgSrc && (
        <div className="relative mr-6 mt-2 h-16 w-16">
          <Image src={imgSrc} alt="별점 이미지" fill />
        </div>
      )}
      <div className={`${ClassNames ?? 'text-md-regular'}`}>{text}</div>
    </div>
  );
};

export const CardHeaderType = (<CardHeader text="" />).type;

export default CardHeader;
