import ActivityInformation from '@/components/pages/ActivityDetails/activityInformation';
import { GetServerSideProps } from 'next';

interface ActivitiesPageProps {
  activityId: string;
  kakaoKey: string;
}

const ActivitiesPage = ({ activityId, kakaoKey }: ActivitiesPageProps) => {
  return (
    <div>
      <ActivityInformation activityId={activityId} kakaoKey={kakaoKey} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const kakaoKey = process.env.KAKAO_KEY;
  const activityId = '2213';
  // 리뷰 페이지네이션 테스트 activityId => 2192
  // 캘린더 예약 가능 스케줄 테스트 activityId => 2213

  if (!kakaoKey) {
    throw new Error('환경 변수에 카카오 키가 정의되지 않았습니다.');
  }

  return {
    props: {
      activityId,
      kakaoKey,
    },
  };
};

export default ActivitiesPage;
