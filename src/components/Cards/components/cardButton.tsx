import Image from 'next/image';

import Button from '../../Button';

const CardButton = ({ buttonName, imgSrc }: { buttonName?: string; imgSrc?: string }) => {
  return (
    <div>
      <Button.Category className="h-32 w-80 text-md-bold">{buttonName}</Button.Category>
      {imgSrc && (
        <div className="relative mr-6 h-16 w-16">
          <Image src={imgSrc} alt="케밥 버튼" fill />
        </div>
      )}
    </div>
  );
};

export default CardButton;
