import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import menuOptionList from './menuOptionList';
import SideNavMenuOption from './sideNavMenuOption';

const SideNavMenuOptionList = () => {
  const [activeOption, setActiveOption] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    // 현재 경로에 따라 활성화된 메뉴 항목을 설정합니다.
    const currentPath = router.pathname;
    const activeId = menuOptionList.find((option) => option.path === currentPath)?.id || 0;
    setActiveOption(activeId);
  }, [router.pathname]);

  const handleNavigation = (id: number) => {
    // 클릭한 메뉴 항목의 경로로 이동합니다.
    const path = menuOptionList.find((option) => option.id === id)?.path || '/';
    router.push(path);
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
