import Button from '@/components/Button';
import Image from 'next/image';

const CardFooter = ({
  text,
  buttonName,
  imgSrc,
}: {
  text: string;
  buttonName?: string;
  imgSrc?: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="pt-7 text-lg-medium text-black md:pt-14 md:text-xl-medium lg:pt-21 lg:text-2xl-medium">
        {text}
      </div>
      <div>
        {buttonName && (
          <Button className="h-32 w-80 text-md-bold">{buttonName}</Button>
        )}
        {imgSrc && (
          <div className="relative mr-6 h-32 w-32">
            <Image src={imgSrc} alt="케밥 버튼" fill />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardFooter;
