import SideNavMenu from '@/components/SideNavMenu/index'
import { useState } from 'react'
import menuOptionList from './menuOptionList'

const SideNavMenuOptionList = () => {
  const [activeOption, setActiveOption] = useState(0)

  return (
    <div className="w-296 md:w-203 lg:w-336 flex flex-col gap-8">
      {menuOptionList.map((option) => (
        <ul key={option.id} onClick={() => setActiveOption(option.id)}>
          <SideNavMenu.sideNavMenuOption
            imgSrc={option.imgSrc}
            text={option.text}
            isActive={activeOption === option.id}
          />
        </ul>
      ))}
    </div>
  )
}

export default SideNavMenuOptionList
