import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import SideNavMenu from '@/components/common/SideNavMenu';
import ActivitySettingsContent from '@/components/pages/myPage/ActivitySettings/activitySettingsContent';
import { useActivitiesQuery } from '@/components/pages/myPage/ActivitySettings/hooks/useActivitiesQuery';
import { useDeviceState } from '@/hooks/useDeviceState';
import { Device } from '@/types/deviceTypes';

const ActivitySettings = () => {
  const deviceState = useDeviceState();

  const isMobile = deviceState === Device.MOBILE;
  const isTablet = deviceState === Device.TABLET;
  const isDesktop = deviceState === Device.DESKTOP;

  const { activitiesData, isActivityEmpty, error: queryError, setTarget } = useActivitiesQuery();

  return (
    <>
      <NavBar />
      <main className="md:mb-400 lg:mb-270 mx-auto mb-[496px] mt-94 w-344 md:w-696 lg:mt-142 lg:w-1200">
        {queryError && <div className="mb-4 text-red-500">{queryError.message}</div>}
        {isMobile && <ActivitySettingsContent activitiesData={activitiesData} isEmpty={isActivityEmpty} />}
        {(isTablet || isDesktop) && (
          <div className="flex justify-between">
            <SideNavMenu />
            <ActivitySettingsContent activitiesData={activitiesData} isEmpty={isActivityEmpty} />
          </div>
        )}
        <div ref={setTarget}></div>
      </main>
      <Footer />
    </>
  );
};

export default ActivitySettings;
