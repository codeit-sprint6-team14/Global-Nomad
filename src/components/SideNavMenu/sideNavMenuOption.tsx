import SideNavMenuOptionProps from '@/types/SideNavMenuOption'

const SideNavMenuOption = ({
  imgSrc,
  text,
  isActive,
}: SideNavMenuOptionProps) => {
  return (
    <li
      className={`flex cursor-pointer items-center py-9 pl-16 ${isActive && 'bg-green-100 rounded-12'}`}
    >
      <div className={`w-24 h-24 ${isActive ? 'text-black' : 'text-gray-600'}`}>
        {imgSrc}
      </div>
      <span
        className={`ml-14 text-lg-bold  ${isActive ? 'text-black-100' : 'text-gray-600'}`}
      >
        {text}
      </span>
    </li>
  )
}

export default SideNavMenuOption
