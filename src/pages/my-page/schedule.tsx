import AnimatedContainer from '@/components/common/Animation/AnimatedContainer';
import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import SideNavMenu from '@/components/common/SideNavMenu';
import MySchedule from '@/components/pages/myPage/Schedule/mySchedule';
import useViewportSize from '@/hooks/useViewportSize';

const Schedule = () => {
  const viewportSize = useViewportSize();
  const isSideNavbarOpen = viewportSize === 'tablet' || 'desktop';

  return (
    <div>
      <NavBar />
      <div className="ml-auto mr-auto mt-94 flex w-343 md:w-696 lg:mt-142 lg:w-1200">
        {isSideNavbarOpen && (
          <div className="hidden w-60 bg-white md:block">
            <SideNavMenu />
          </div>
        )}
        <div className="mb-60 ml-auto mr-auto md:mr-0 md:w-430 lg:w-792">
          <AnimatedContainer>
            <MySchedule />
          </AnimatedContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Schedule;
