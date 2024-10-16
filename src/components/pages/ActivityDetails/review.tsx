import { ReviewType } from '@/types/activityReviews';
import { formatDateUTC } from '@/utils/formatDate';
import Image from 'next/image';

const Review = ({ review }: { review: ReviewType }) => {
  const { content, createdAt } = review;
  const { profileImageUrl, nickname = '이영훈' } = review.user;

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex gap-16 border-b border-solid border-gray-300 py-24">
      <div className="relative h-45 w-45 flex-shrink-0">
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            style={{ objectFit: 'cover' }}
            alt="프로필이미지"
            fill
            className="rounded-full"
            sizes="(min-width: 375px) 45px"
          />
        ) : (
          <div className="flex h-45 w-45 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-lg-bold text-gray-600">
            {getInitial(nickname)}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center">
          <h1 className="text-lg-bold">{nickname}</h1>
          <span className="px-8 text-md-regular text-black-100">|</span>
          <span className="text-lg-regular text-gray-600">{formatDateUTC(createdAt)}</span>
        </div>
        <p className="mt-8 text-lg-regular text-black-100">{content}</p>
      </div>
    </div>
  );
};

export default Review;
