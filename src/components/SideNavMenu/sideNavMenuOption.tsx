import SideNavMenuOptionProps from '@/types/SideNavMenuOption'
import Image from 'next/image'

const SideNavMenuOption = ({
  imgSrc,
  text,
  isActive,
}: SideNavMenuOptionProps) => {
  return (
    <li
      className={`flex items-center py-9 pl-16 ${isActive && 'bg-green-100 rounded-12'}`}
    >
      <Image src={imgSrc} alt={text} width={24} height={24} />
      <span
        className={`ml-14 text-lg-bold text-gray-600 ${isActive && 'text-black-100'}`}
      >
        {text}
      </span>
    </li>
  )
}

export default SideNavMenuOption
