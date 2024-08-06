import { ReviewType } from '@/types/activityReviews';
import Image from 'next/image';

const Review = ({ review }: { review: ReviewType }) => {
  const { content, createdAt } = review;
  const { profileImageUrl, nickname = '이영훈' } = review.user;

  return (
    <div className="flex gap-16 border-b border-solid border-gray-300 pb-24">
      {profileImageUrl && (
        <div className="relative h-45 w-45 flex-shrink-0">
          <Image
            src={profileImageUrl}
            style={{ objectFit: 'cover' }}
            alt="프로필이미지"
            fill
            className="rounded-full"
            sizes="(min-width: 375px) 45px"
          />
        </div>
      )}

      <div>
        <div className="flex items-center">
          <h1 className="text-lg-bold">{nickname}</h1>
          <span className="px-8 text-md-regular text-black-100">|</span>
          <span className="text-lg-regular text-gray-600">{createdAt}</span>
        </div>
        <p className="mt-8 text-lg-regular text-black-100">{content}</p>
      </div>
    </div>
  );
};

export default Review;
