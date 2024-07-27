import { useState } from 'react';

import menuOptionList from './menuOptionList';
import SideNavMenuOption from './sideNavMenuOption';

const SideNavMenuOptionList = () => {
  const [activeOption, setActiveOption] = useState(0);

  return (
    <div className="flex w-296 flex-col gap-8 md:w-203 lg:w-336">
      {menuOptionList.map((option) => (
        <ul key={option.id} onClick={() => setActiveOption(option.id)}>
          <SideNavMenuOption
            imgSrc={option.imgSrc}
            text={option.text}
            isActive={activeOption === option.id}
          />
        </ul>
      ))}
    </div>
  );
};

export default SideNavMenuOptionList;
