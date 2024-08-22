import { motion } from 'framer-motion';
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
    const isRegistActivityPath = currentPath.startsWith('/my-page/regist-activity');

    const activeMenuOption = menuOptionList.find((option) => {
      if (isRegistActivityPath) {
        return option.path === '/my-page/activity-settings';
      }
      return option.path === currentPath;
    });

    if (activeMenuOption) {
      setActiveOption(activeMenuOption.id);
    }
  }, [router.asPath]);

  return (
    <div className="flex w-296 flex-col gap-8 md:w-203 lg:w-336">
      {menuOptionList.map((option) => (
        <motion.ul
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          key={option.id}
          onClick={() => handleOptionClick(option.path)}
        >
          <SideNavMenuOption imgSrc={option.imgSrc} text={option.text} isActive={activeOption === option.id} />
        </motion.ul>
      ))}
    </div>
  );
};

export default SideNavMenuOptionList;
