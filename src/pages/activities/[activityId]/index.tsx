import { useActivityData } from '@/apis/ActivityDetailsPage/getActivityDetailsData';
import ActivityInformation from '@/components/pages/ActivityDetails/activityInformation';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface ActivityDetailsPageProps {
  activityId: string;
  kakaoKey: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const kakaoKey = process.env.KAKAO_KEY;
  const activityId = context.params?.activityId as string;

  if (!kakaoKey) {
    throw new Error('환경 변수에 카카오 키가 정의되지 않았습니다.');
  }

  if (!activityId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      activityId,
      kakaoKey,
    },
  };
};

const ActivitiesPage = ({ activityId, kakaoKey }: ActivityDetailsPageProps) => {
  const { activityData, isLoading, error } = useActivityData(activityId);

  if (isLoading) return <div className="flex h-[90vh] items-center justify-center">로딩 중...</div>;
  if (error) return <div>체험에 대한 데이터를 불러오는데 실패했습니다.</div>;
  if (!activityData) return null;

  const title = activityData ? `${activityData.title} - 체험 상세` : '체험 상세 - 글로벌노마드';
  const description = activityData
    ? activityData.description.slice(0, 150) + '...'
    : '글로벌노마드에서 특별한 체험을 예약하세요!';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={activityData?.bannerImageUrl || '/assets/images/auth-logo.png'} />
        <meta property="og:url" content={`https://global-nomad-team14.vercel.app/activities/${activityId}`} />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div>
        <ActivityInformation activityData={activityData} activityId={activityId} kakaoKey={kakaoKey} />
      </div>
    </>
  );
};

export default ActivitiesPage;
