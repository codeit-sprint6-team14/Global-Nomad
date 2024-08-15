import { axiosRequester } from '@/libs/axios';
import { ReviewData } from '@/types/activityReviews';
import { ReviewListData } from '@/types/reviewList';
import { useQuery } from '@tanstack/react-query';

export const getActivityReviewList = async ({
  activityId,
  page,
  size,
}: {
  activityId: string;
  page: number;
  size: number;
}) => {
  const { data } = await axiosRequester<ReviewListData>({
    options: {
      method: 'GET',
      url: `/activities/${activityId}/reviews?page=${page}&size=${size}`,
    },
  });

  return data;
};

type useActivityReviewListProps = {
  activityId: string;
  page: number;
  size: number;
};

export const useActivityReviewList = ({
  activityId,
  page: currentPage,
  size: REVIEWS_PER_PAGE,
}: useActivityReviewListProps) => {
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
  return { reviewListData, isLoading, error, refetch, isPlaceholderData };
};
