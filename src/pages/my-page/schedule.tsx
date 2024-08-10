import SideNavMenu from '@/components/common/SideNavMenu';
import MySchedule from '@/components/pages/myPageSchedule/mySchedule';
import useViewportSize from '@/hooks/useViewportSize';

const Schedule = () => {
  const viewportSize = useViewportSize();
  const isSideNavbarOpen = viewportSize === 'tablet' || 'desktop';

  return (
    <div>
      <div className="bg-gray-100">
        <div className="ml-auto mr-auto flex md:w-744 lg:w-1200">
          <div className="ml-30 mt-30">
            {isSideNavbarOpen && (
              <div className="hidden w-60 bg-white md:block">
                <SideNavMenu />
              </div>
            )}
          </div>
          <div className="mb-60 ml-auto mr-auto w-343 md:mr-0 md:w-430 lg:w-750">
            <MySchedule />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Schedule;
