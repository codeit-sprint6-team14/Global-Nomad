import { getActivityReviewList } from '@/apis/getActivity';
import Pagination from '@/components/common/Pagination';
import { ReviewData, ReviewType } from '@/types/activityReviews';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

import Review from './review';

const REVIEWS_PER_PAGE = 1;

const ReviewList = ({ activityId }: { activityId: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: reviewListData,
    isLoading,
    error,
    refetch,
    isPlaceholderData,
  } = useQuery<ReviewData>({
    queryKey: ['review', activityId, currentPage],
    queryFn: () => getActivityReviewList({ activityId, page: currentPage, size: REVIEWS_PER_PAGE }),
    placeholderData: (prevData) => prevData,
    staleTime: 5000,
  });

  if (isLoading) return <div>댓글 로딩중입니다...</div>;
  if (error) return <div>댓글을 불러오는데 실패했습니다.</div>;
  if (!reviewListData) return null;

  const { averageRating, totalCount, reviews } = reviewListData;

  const totalPages = Math.ceil(totalCount / REVIEWS_PER_PAGE);

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    await refetch();
  };

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
      {reviews.map((review: ReviewType) => (
        <Review key={review.id} review={review} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
};

export default ReviewList;
