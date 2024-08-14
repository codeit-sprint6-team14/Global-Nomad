import { useMyInformation } from '@/apis/ActivityDetailsPage/activityDetails';
import { useActivityData } from '@/apis/ActivityDetailsPage/useActivityData';
import FloatingBox from '@/components/common/FloatingBox';
import useViewportSize from '@/hooks/useViewportSize';
import { activityIdAtom, reservationPriceAtom } from '@/store/activityDetailsAtom';
import { useSetAtom } from 'jotai';

import BannerImage from './bannerImage';
import ActivityDescription from './description';
import Header from './header';
import KakaoMap from './kakaoMap';
import ReviewList from './reviewList';

// 리뷰 페이지네이션 테스트 activityId => 2192
// 캘린더 예약 가능 스케줄 테스트 activityId => 2213
const ActivityInformation = ({ activityId = '2213' }: { activityId?: string }) => {
  const viewportSize = useViewportSize();

  const isMobile = viewportSize === 'mobile';
  const isTablet = viewportSize === 'tablet';

  const setPrice = useSetAtom(reservationPriceAtom);

  const setActivityId = useSetAtom(activityIdAtom);
  setActivityId(activityId);

  const { userInformationData, isLoading: isLoadingUserData } = useMyInformation();
  const { activityData, isLoading: isLoadingActivityData, error } = useActivityData(activityId);

  if (isLoadingUserData || isLoadingActivityData) return <div>데이터 로딩중입니다...</div>;
  if (error) return <div>체험 상세 데이터를 불러오는데 실패했습니다.</div>;
  if (!activityData || !userInformationData) return <div>데이터를 불러오는데 실패했습니다.</div>;

  const { category, title, rating, reviewCount, address, bannerImageUrl, description, subImages, price, userId } =
    activityData;

  setPrice(price);

  const myId = userInformationData.id;

  return (
    <>
      <div className="lg:mx-auto lg:max-w-[1200px] lg:pt-78">
        <Header
          myId={myId}
          userId={userId}
          category={category}
          title={title}
          rating={rating}
          reviewCount={reviewCount}
          address={address}
        />

        <BannerImage bannerImageUrl={bannerImageUrl} subImages={subImages} />
        <div className="mx-24 flex justify-between md:pb-40 lg:mx-auto lg:max-w-[1200px]">
          <div className="flex flex-col md:mr-24 md:pt-0">
            <ActivityDescription description={description} />
            <KakaoMap address={address} />
          </div>
          {!isMobile &&
            myId !== userId &&
            (isTablet ? (
              <FloatingBox.Tablet />
            ) : (
              <FloatingBox.Desktop activityId={activityId} classNames="sticky top-0 w-[384px]" buttonLabel="예약하기" />
            ))}
        </div>
        <ReviewList activityId={activityId} />
        {isMobile && myId !== userId && (
          <div className="mt-89">
            <FloatingBox.Mobile />
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityInformation;
