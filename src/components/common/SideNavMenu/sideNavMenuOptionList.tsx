import { useRouter } from 'next/router';
import { useState } from 'react';

import menuOptionList from './menuOptionList';
import SideNavMenuOption from './sideNavMenuOption';

const SideNavMenuOptionList = () => {
  const [activeOption, setActiveOption] = useState(0);
  const router = useRouter();

  const handleNavigation = (id: number) => {
    setActiveOption(id);

    switch (id) {
      case 1:
        router.push('/mypage/profile');
        break;
      case 2:
        router.push('/mypage/reservation-list');
        break;
      case 3:
        router.push('/mypage/activity-settings');
        break;
      case 4:
        router.push('/mypage/schedule');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex w-296 flex-col gap-8 md:w-203 lg:w-336">
      {menuOptionList.map((option) => (
        <ul key={option.id} onClick={() => handleNavigation(option.id)}>
          <SideNavMenuOption imgSrc={option.imgSrc} text={option.text} isActive={activeOption === option.id} />
        </ul>
      ))}
    </div>
  );
};

export default SideNavMenuOptionList;
