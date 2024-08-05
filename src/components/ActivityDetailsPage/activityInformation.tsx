import getActivity from '@/apis/getActivity';
import useViewportSize from '@/hooks/useViewportSize';
import { useQuery } from '@tanstack/react-query';

import FloatingBox from '../FloatingBox';
import NavBar from '../NavBar';
import BannerImage from './bannerImage';
import ActivityDescription from './description';
import Header from './header';
import KakaoMap from './kakaoMap';
import ReviewList from './reviewList';

const ActivityInformation = ({ activityId = '2040' }: { activityId?: string }) => {
  const viewportSize = useViewportSize();

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
      <NavBar />
      <div className="lg:mx-auto lg:max-w-[1200px] lg:pt-78">
        <Header category={category} title={title} rating={rating} reviewCount={reviewCount} address={address} />

        <BannerImage bannerImageUrl={bannerImageUrl} subImages={subImages} />
        <div className="mx-24 flex justify-between md:pb-40 lg:mx-auto lg:max-w-[1200px]">
          <div className="flex flex-col md:mr-24 md:pt-0 lg:mr-0">
            <ActivityDescription description={description} />
            <KakaoMap address={address} />
          </div>
          {viewportSize === 'tablet' ? <FloatingBox.Tablet /> : viewportSize === 'desktop' && <FloatingBox.Desktop />}
        </div>
        <ReviewList />
        {viewportSize !== 'tablet' && viewportSize !== 'desktop' && (
          <div className="mt-89">
            <FloatingBox.Mobile />
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityInformation;
