import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import menuOptionList from './menuOptionList';
import SideNavMenuOption from './sideNavMenuOption';

const SideNavMenuOptionList = () => {
  const [activeOption, setActiveOption] = useState(0);
  const router = useRouter();

  const handleOptionClick = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    const currentPath = router.asPath;
    const activeMenuOption = menuOptionList.find((option) => option.path === currentPath);

    if (activeMenuOption) {
      setActiveOption(activeMenuOption.id);
    }
  }, [router.asPath]);

  return (
    <div className="flex w-296 flex-col gap-8 md:w-203 lg:w-336">
      {menuOptionList.map((option) => (
        <ul key={option.id} onClick={() => handleOptionClick(option.path)}>
          <SideNavMenuOption imgSrc={option.imgSrc} text={option.text} isActive={activeOption === option.id} />
        </ul>
      ))}
    </div>
  );
};

export default SideNavMenuOptionList;
