/* eslint-disable react/function-component-definition */
import { useState } from 'react'

interface CategoryButtonProps {
  children: React.ReactNode
}

const CategoryButton = ({ children }: CategoryButtonProps) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-center rounded-15 text-lg-medium border border-green-300 w-100 h-51 md:text-2lg-medium md:w-127 md:h-53 ${isActive ? 'bg-black-100 text-white' : 'text-green-300'}`}
      >
        {children}
      </button>
    </div>
  )
}

export default CategoryButton
