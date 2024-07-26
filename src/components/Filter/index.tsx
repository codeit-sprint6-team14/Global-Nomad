/* eslint-disable react/function-component-definition */
import { useState } from 'react'

import DownArrow from '@/../public/svgs/down-arrow.svg'

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDropDownToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDropDownToggle}
        className="flex gap-21 items-center justify-center w-107 h-51 rounded-15 border border-green-300 bg-white text-green-300 md:w-160 md:h-53 md:gap-70"
      >
        가격
        <DownArrow />
      </button>
      {isOpen && (
        <ul className="absolute mt-8 w-107 h-82 rounded-6 shadow-lg bg-white ring-1 ring-black ring-opacity-5 md:w-160">
          <li className="border-b">
            <button
              type="button"
              className="w-full h-41 text-sm-medium text-gray-800 cursor-pointer hover:bg-gray-200 hover:rounded-t-6"
              onClick={handleOptionClick}
            >
              가격이 낮은 순
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full h-41 text-sm-medium text-gray-800 cursor-pointer hover:bg-gray-200 hover:rounded-b-6"
              onClick={handleOptionClick}
            >
              가격이 높은 순
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Filter
