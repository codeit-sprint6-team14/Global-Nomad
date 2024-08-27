import Share from '@/../public/assets/icons/share.svg';
import Star from '@/../public/assets/icons/star.svg';
import useToast from '@/hooks/useToast';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Skeleton from './Skeleton/Skeleton';
import { ActivityCardProps } from './mainPage.type';
import { useBackupImage } from './useBackupImage';

const PopularActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const { imageSource, altText, handleImageError } = useBackupImage(activity.bannerImageUrl);
  const [backgroundColor, setBackgroundColor] = useState('');
  const toast = useToast();

  useEffect(() => {
    const colors = ['bg-purple-100', 'bg-pink-200', 'bg-sky-200'];
    setBackgroundColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  useEffect(() => {
    if (showCopiedMessage) {
      toast.success('링크가 복사됐습니다');
    }
  }, [showCopiedMessage]);

  const handleShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const activityUrl = `${window.location.origin}/activities/${activity.id}`;
    navigator.clipboard.writeText(activityUrl).then(() => {
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    });
  };

  return (
    <Link
      href={`/activities/${activity.id}`}
      className="group relative mb-48 overflow-hidden rounded-25 sm:h-168 sm:w-168 md:h-384 md:w-384"
    >
      <div className={`absolute inset-0 ${backgroundColor} ${imageLoaded ? 'hidden' : 'block'}`}>
        <Skeleton className="h-full w-full" />
      </div>
      <button
        className="absolute right-10 top-10 z-[2] flex h-30 w-30 items-center justify-center rounded-25 bg-white hover:scale-110"
        onClick={handleShareClick}
      >
        <Share width={20} height={20} />
      </button>
      <Image
        src={imageSource}
        alt={altText}
        fill
        sizes="(max-width: 768px) 168px, 384px"
        style={{ objectFit: 'cover' }}
        className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onError={handleImageError}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
      <div className="absolute inset-0 flex flex-col justify-end text-white sm:gap-6 sm:px-20 sm:py-12 md:gap-20 md:px-20 md:py-30">
        <div className="flex items-center gap-5 text-md-semibold">
          <Star width={16} height={16} />
          <span>{activity.rating.toFixed(1)}</span>
          <span>({activity.reviewCount})</span>
        </div>
        <h3 className="line-clamp-2 sm:h-52 sm:text-2lg-bold md:h-84 md:w-251 md:text-3xl-bold">{activity.title}</h3>
        <p className="flex items-center gap-5 sm:text-lg-bold md:text-xl-bold">
          <span>₩</span>
          <span>{activity.price.toLocaleString()}</span>
          <span className="text-md-regular text-gray-600">/ 인</span>
        </p>
      </div>
    </Link>
  );
};

export default PopularActivityCard;
