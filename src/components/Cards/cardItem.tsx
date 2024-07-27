import useCardStatus from '@/hooks/useCardStatus';
import { Card } from '@/types/CardListData';
import Image from 'next/image';

interface CardItemProps {
  card: Card;
}

const CardItem = ({ card }: CardItemProps) => {
  const { bannerImageUrl, title } = card.activity;
  const { status, totalPrice, headCount, date, startTime, endTime } = card;

  const statusText = useCardStatus(
    status as 'pending' | 'confirmed' | 'completed' | 'declined' | 'canceled',
  );

  return (
    <li className="flex w-344 rounded-24 bg-gray-100 md:w-429 lg:w-792">
      <div className="relative h-128 w-128 flex-shrink-0 md:h-156 md:w-156 lg:h-204 lg:w-204">
        <Image
          fill
          className="rounded-l-24"
          style={{ objectFit: 'cover' }}
          src={bannerImageUrl}
          alt="카드 배너 이미지"
        />
      </div>
      <div className="flex flex-col justify-center overflow-hidden py-12 pl-8 pr-14 md:pl-12 md:pr-16 lg:px-24">
        <div className="text-md-bold md:text-lg-bold">{statusText}</div>
        <div className="truncate text-md-bold md:text-2lg-bold lg:pt-8 lg:text-xl-bold">
          {title}
        </div>
        <div className="text-xs-regular text-black-100 md:pt-5 md:text-md-regular lg:pt-12 lg:text-2lg-regular">
          {date} · {startTime} - {endTime} · {headCount}명
        </div>
        <div className="pt-7 text-lg-medium text-black md:pt-14 md:text-xl-medium lg:pt-21 lg:text-2xl-medium">
          ₩{totalPrice}
        </div>
      </div>
    </li>
  );
};

export default CardItem;
