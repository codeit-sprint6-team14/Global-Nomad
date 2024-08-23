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
      {queryError && <div className="mb-4 text-red-500">{queryError.message}</div>}
      <main className="mx-auto mb-86 mt-16 w-344 md:mb-94 md:mt-24 md:w-696 lg:mb-142 lg:mt-72 lg:w-1200">
        {isMobile && <ActivitySettingsContent activitiesData={activitiesData} isEmpty={isActivityEmpty} />}
        {(isTablet || isDesktop) && (
          <div className="flex justify-between">
            <SideNavMenu />
            <ActivitySettingsContent activitiesData={activitiesData} isEmpty={isActivityEmpty} />
          </div>
        )}
        <div ref={setTarget}></div>
      </main>
    </>
  );
};

export default ActivitySettings;
