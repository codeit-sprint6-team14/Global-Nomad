import SideNavMenu from '@/components/common/SideNavMenu';
import RegistActivityContent from '@/components/pages/myPage/RegistActivity/registActivityContent';
import { useDeviceState } from '@/hooks/useDeviceState';
import { Device } from '@/types/deviceTypes';
import { useRouter } from 'next/router';

const ModifyMyActivity = () => {
  const router = useRouter();
  const { 'activity-id': activityId } = router.query;
  const deviceState = useDeviceState();

  const isMobile = deviceState === Device.MOBILE;
  const isTablet = deviceState === Device.TABLET;
  const isDesktop = deviceState === Device.DESKTOP;

  return (
    <div>
      <main className="mx-auto mb-94 mt-94 w-343 md:w-696 lg:mb-142 lg:mt-142 lg:w-1200">
        {isMobile && <RegistActivityContent activityId={activityId} />}
        {(isTablet || isDesktop) && (
          <div className="flex justify-between">
            <SideNavMenu />
            <RegistActivityContent activityId={activityId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ModifyMyActivity;
