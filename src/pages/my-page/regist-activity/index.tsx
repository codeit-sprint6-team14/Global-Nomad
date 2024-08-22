import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import SideNavMenu from '@/components/common/SideNavMenu';
import RegistActivityContent from '@/components/pages/myPage/RegistActivity/registActivityContent';
import { useDeviceState } from '@/hooks/useDeviceState';
import { Device } from '@/types/deviceTypes';

const RegistActivity = () => {
  const deviceState = useDeviceState();

  const isMobile = deviceState === Device.MOBILE;
  const isTablet = deviceState === Device.TABLET;
  const isDesktop = deviceState === Device.DESKTOP;

  return (
    <>
      <NavBar />
      <main className="mx-auto mb-94 mt-24 w-343 md:w-696 lg:mb-142 lg:mt-72 lg:w-1200">
        {isMobile && <RegistActivityContent />}
        {(isTablet || isDesktop) && (
          <div className="flex justify-between">
            <SideNavMenu />
            <RegistActivityContent />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default RegistActivity;
