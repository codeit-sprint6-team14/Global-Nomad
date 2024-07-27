import SideNavMenuOptionList from './sideNavMenuOptionList';
import SideNavMenuProfile from './sideNavMenuProfile';

const SideNavMenu = () => {
  return (
    <div className="flex h-max w-max flex-col gap-24 rounded-12 border border-solid border-gray-300 p-24">
      <SideNavMenuProfile />
      <SideNavMenuOptionList />
    </div>
  );
};

export default SideNavMenu;
