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
      <AnimatedContainer>
        <div className="ml-auto mr-auto flex w-343 pt-94 md:w-696 lg:w-1200 lg:pt-142">
          {isSideNavbarOpen && (
            <nav className="hidden w-60 bg-white md:block">
              <SideNavMenu />
            </nav>
          )}
          <main className="mb-60 ml-auto mr-auto md:mr-0 md:w-430 lg:w-792">
            <MySchedule />
          </main>
        </div>
      </AnimatedContainer>
      <Footer />
    </div>
  );
};
export default Schedule;
