import { getActivityReviewList } from '@/apis/getActivity';
import { ReviewType } from '@/types/activityReviews';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import Review from './review';

const ReviewList = ({ activityId }: { activityId: string }) => {
  const {
    data: reviewListData,
    isLoading,
    error,
  } = useQuery({ queryKey: ['review', activityId], queryFn: () => getActivityReviewList({ activityId }) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  if (!reviewListData) return null;

  const { averageRating, totalCount } = reviewListData;

  return (
    <div className="mx-24 flex flex-col gap-18 border-solid border-gray-300 pt-40 md:border-t lg:mx-0">
      <h1 className="text-xl-bold text-black-100">후기</h1>
      <div className="flex items-center gap-16">
        <div className="text-50 font-semibold leading-[60px] text-black-100">{averageRating}</div>
        <div className="flex flex-col gap-8">
          <span className="text-2lg-regular text-black-100">
            {averageRating >= 4 ? '매우 만족' : averageRating >= 3 ? '보통' : '불만족'}
          </span>
          <div className="flex gap-6">
            <div className="relative mt-2 h-16 w-16">
              <Image fill src="/assets/icons/star.svg" alt="별점 아이콘" />
            </div>
            <span className="text-md-regular text-black-100">{totalCount}개 후기</span>
          </div>
        </div>
      </div>
      {reviewListData.reviews.map((review: ReviewType) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
