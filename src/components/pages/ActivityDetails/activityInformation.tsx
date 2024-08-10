import FloatingBox from '@/components/common/FloatingBox';
import { useActivityData } from '@/hooks/useActivityData';
import useViewportSize from '@/hooks/useViewportSize';

import BannerImage from './bannerImage';
import ActivityDescription from './description';
import Header from './header';
import KakaoMap from './kakaoMap';
import ReviewList from './reviewList';

const ActivityInformation = ({ activityId = '2195' }: { activityId?: string }) => {
  const viewportSize = useViewportSize();

  const isMobile = viewportSize === 'mobile';
  const isTablet = viewportSize === 'tablet';

  const { activityData, isLoading, error } = useActivityData(activityId);

  if (isLoading) return <div>체험 상세 데이터 로딩중입니다...</div>;
  if (error) return <div>체험 상세 데이터를 불러오는데 실패했습니다.</div>;
  if (!activityData) return null;

  const { category, title, rating, reviewCount, address, bannerImageUrl, description, subImages } = activityData;

  return (
    <>
      <div className="lg:mx-auto lg:max-w-[1200px] lg:pt-78">
        <Header category={category} title={title} rating={rating} reviewCount={reviewCount} address={address} />

        <BannerImage bannerImageUrl={bannerImageUrl} subImages={subImages} />
        <div className="mx-24 flex justify-between md:pb-40 lg:mx-auto lg:max-w-[1200px]">
          <div className="flex flex-col md:mr-24 md:pt-0">
            <ActivityDescription description={description} />
            <KakaoMap address={address} />
          </div>
          {!isMobile && (isTablet ? <FloatingBox.Tablet /> : <FloatingBox.Desktop activityId={activityId} />)}
        </div>
        <ReviewList activityId={activityId} />
        {isMobile && (
          <div className="mt-89">
            <FloatingBox.Mobile />
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityInformation;
