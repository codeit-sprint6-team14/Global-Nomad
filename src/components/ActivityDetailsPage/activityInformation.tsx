import getActivity from '@/apis/getActivity';
import useViewportSize from '@/hooks/useViewportSize';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import FloatingBox from '../FloatingBox';
import NavBar from '../NavBar';
import ActivityBanner from './activityBanner';
import ActivityDescription from './activityDescription';
import KakaoMap from './kakaoMap';

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

      <div className="px-16 pt-16 md:px-24 md:pt-24">
        <div className="text-md-regular text-black-100">{category}</div>
        <div className="mt-10 flex items-center justify-between">
          <h1 className="text-2xl-bold text-black-100 md:text-3xl-bold">{title}</h1>
          <Image width={40} height={40} src="/assets/icons/kebab.svg" alt="케밥 아이콘" />
        </div>
        <div className="mt-16 flex">
          <Image className="mb-3" width={16} height={16} src="/assets/icons/star.svg" alt="별점 아이콘" />
          <div className="ml-6 text-md-regular text-black">{`${rating} (${reviewCount})`}</div>
          <Image className="ml-12" src="/assets/icons/map.svg" width={18} height={18} alt="지도 아이콘" />
          <div className="ml-2 text-md-regular text-black-100">{address}</div>
        </div>
      </div>

      <ActivityBanner bannerImageUrl={bannerImageUrl} subImages={subImages} />
      <div className="flex">
        <div className="mx-24 flex flex-col justify-between gap-16 md:pt-0 lg:mx-auto">
          <ActivityDescription description={description} />
          <KakaoMap />
        </div>
        <div className="">
          {viewportSize === 'tablet' ? <FloatingBox.Tablet /> : viewportSize === 'desktop' && <FloatingBox.Desktop />}
        </div>
      </div>
      {viewportSize !== 'tablet' && viewportSize !== 'desktop' && <FloatingBox.Mobile />}
    </>
  );
};

export default ActivityInformation;
