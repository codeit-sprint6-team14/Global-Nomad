import LeftArrow from '@/../public/assets/icons/left-arrow.svg';
import AnimatedContainer from '@/components/common/Animation/AnimatedContainer';
import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import SideNavMenu from '@/components/common/SideNavMenu';
import ActivitySettingsContent from '@/components/pages/myPage/ActivitySettings/activitySettingsContent';
import { useActivitiesQuery } from '@/components/pages/myPage/ActivitySettings/hooks/useActivitiesQuery';
import { useDeviceState } from '@/hooks/useDeviceState';
import { Device } from '@/types/deviceTypes';
import { useRouter } from 'next/router';

const ActivitySettings = () => {
  const router = useRouter();
  const deviceState = useDeviceState();
  const isMobile = deviceState === Device.MOBILE;

  const { activitiesData, isActivityEmpty, setTarget } = useActivitiesQuery();

  return (
    <>
      <NavBar />
      <AnimatedContainer>
        <main className="md:mb-400 lg:mb-270 mx-auto mb-[496px] w-344 pt-94 md:w-696 lg:w-1200 lg:pt-142">
          {isMobile ? (
            <div className={`flex flex-col ${isActivityEmpty && 'gap-90'}`}>
              <div className="mb-12 flex items-center">
                <div className="cursor-pointer md:hidden">
                  <LeftArrow onClick={() => router.push('/my-page')} />
                </div>
                <h1 className="ml-10 mr-15 text-3xl-bold">내 체험 관리</h1>
                <Button.Default
                  onClick={() => router.push('/my-page/regist-activity')}
                  className="h-48 w-120 rounded-4"
                >
                  체험 등록하기
                </Button.Default>
              </div>
              <ActivitySettingsContent activitiesData={activitiesData} isEmpty={isActivityEmpty} />
            </div>
          ) : (
            <div className="flex justify-between">
              <SideNavMenu />
              <div className="flex flex-col">
                <div className={`flex justify-between md:mb-24 ${isActivityEmpty && 'md:mb-64 lg:mb-80'}`}>
                  <h1 className="text-3xl-bold">내 체험 관리</h1>
                  <Button.Default
                    onClick={() => router.push('/my-page/regist-activity')}
                    className="h-48 w-120 rounded-4"
                  >
                    체험 등록하기
                  </Button.Default>
                </div>
                <ActivitySettingsContent activitiesData={activitiesData} isEmpty={isActivityEmpty} />
              </div>
            </div>
          )}
          <div ref={setTarget}></div>
        </main>
      </AnimatedContainer>
      <Footer />
    </>
  );
};

export default ActivitySettings;
