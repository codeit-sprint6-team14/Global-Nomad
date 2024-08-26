import { useActivityReviewList } from '@/apis/ActivityDetailsPage/getActivityReviewList';
import Pagination from '@/components/common/Pagination';
import { ReviewType } from '@/types/activityReviews';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import Review from './review';

const REVIEWS_PER_PAGE = 5;

const ReviewList = ({ activityId }: { activityId: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { reviewListData, error, isLoading, isPlaceholderData, refetch } = useActivityReviewList({
    activityId,
    page: currentPage,
    size: REVIEWS_PER_PAGE,
  });

  if (isLoading) return <div>댓글 로딩중입니다...</div>;
  if (error) return <div>댓글을 불러오는데 실패했습니다.</div>;
  if (!reviewListData) return null;

  const { averageRating, totalCount, reviews } = reviewListData;

  const formattedRating = Number(averageRating.toFixed(1));

  const totalPages = Math.ceil(totalCount / REVIEWS_PER_PAGE);

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    await refetch();
  };

  const reviewerSatisfaction = () => {
    if (formattedRating >= 4) {
      return '매우 만족';
    } else if (formattedRating >= 3) {
      return '보통';
    } else if (formattedRating < 3) {
      return '나쁨';
    }
  };

  const floatAnimation = {
    initial: { y: 0 },
    animate: { y: [0, -25, 0] },
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  };

  return (
    <>
      {totalCount !== 0 ? (
        <div className="mx-24 flex flex-col gap-18 border-solid border-gray-300 pt-40 md:border-t lg:mx-0">
          <h1 className="text-xl-bold text-black-100">후기</h1>
          <div className="flex items-center gap-16">
            <div className="text-50 font-semibold leading-[60px] text-black-100">{formattedRating}</div>
            <div className="flex flex-col gap-8">
              <span className="text-2lg-regular text-black-100">{reviewerSatisfaction()}</span>
              <div className="flex gap-6">
                <div className="relative mt-2 h-16 w-16">
                  <Image fill src="/assets/icons/star.svg" alt="별점 아이콘" />
                </div>
                <span className="text-md-regular text-black-100">{totalCount}개 후기</span>
              </div>
            </div>
          </div>
          <div className="h-400 overflow-y-auto md:h-550">
            {reviews.map((review: ReviewType) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isPlaceholderData={isPlaceholderData}
          />
        </div>
      ) : (
        <div className="mx-24 flex flex-col items-center gap-20 border-solid border-gray-300 p-40 md:border-t md:py-100 lg:mx-0 lg:py-140">
          <motion.div {...floatAnimation} className="relative h-140 w-140 md:h-180 md:w-180 lg:h-220 lg:w-220">
            <Image fill src="/assets/icons/paper.svg" alt="후기가 없을 때" />
          </motion.div>
          <p className="text-xl-medium text-gray-700 md:text-2xl-medium">아직 등록된 후기가 없어요</p>
        </div>
      )}
    </>
  );
};

export default ReviewList;
