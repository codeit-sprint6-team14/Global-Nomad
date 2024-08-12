import SideNavMenu from '@/components/common/SideNavMenu';
import ActivitySettingsContent from '@/components/pages/myPage/ActivitySettings/activitySettingsContent';
import { useDeviceState } from '@/hooks/useDeviceState';
import ActivityCardsData from '@/mockData/myActivityCardsData';
import { Device } from '@/types/deviceTypes';

const ActivitySettings = () => {
  const deviceState = useDeviceState();

  const isActivityEmpty = ActivityCardsData.length === 0;

  // 디바이스 크기
  const isMobile = deviceState === Device.MOBILE;
  const isTablet = deviceState === Device.TABLET;
  const isDesktop = deviceState === Device.DESKTOP;

  return (
    <>
      <main className="mx-auto mb-86 mt-16 w-344 md:mb-94 md:mt-24 md:w-696 lg:mb-142 lg:mt-72 lg:w-1200">
        {isMobile && <ActivitySettingsContent isEmpty={isActivityEmpty} />}
        {(isTablet || isDesktop) && (
          <div className="flex justify-between">
            <SideNavMenu />
            <ActivitySettingsContent isEmpty={isActivityEmpty} />
          </div>
        )}
      </main>
    </>
  );
};

export default ActivitySettings;
