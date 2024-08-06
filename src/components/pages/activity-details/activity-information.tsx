import { getActivity } from '@/apis/getActivity';
import FloatingBox from '@/components/common/FloatingBox';
import useViewportSize from '@/hooks/useViewportSize';
import { useQuery } from '@tanstack/react-query';

import BannerImage from './banner-image';
import ActivityDescription from './description';
import Header from './header';
import KakaoMap from './kakao-map';
import ReviewList from './review-list';

const ActivityInformation = ({ activityId = '2105' }: { activityId?: string }) => {
  const viewportSize = useViewportSize();

  const isMobile = viewportSize === 'mobile';
  const isTablet = viewportSize === 'tablet';

  const {
    data: activityData,
    isLoading,
    error,
  } = useQuery({ queryKey: ['activity', activityId], queryFn: () => getActivity({ activityId }) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  if (!activityData) return null;

  const { category, title, rating, reviewCount, address, bannerImageUrl, description, subImages } = activityData;

  return (
    <>
      <div className="lg:mx-auto lg:max-w-[1200px] lg:pt-149">
        <Header category={category} title={title} rating={rating} reviewCount={reviewCount} address={address} />

        <BannerImage bannerImageUrl={bannerImageUrl} subImages={subImages} />
        <div className="mx-24 flex justify-between md:pb-40 lg:mx-auto lg:max-w-[1200px]">
          <div className="flex flex-col md:mr-24 md:pt-0 lg:mr-0">
            <ActivityDescription description={description} />
            <KakaoMap address={address} />
          </div>
          {!isMobile && (isTablet ? <FloatingBox.Tablet /> : <FloatingBox.Desktop />)}
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
