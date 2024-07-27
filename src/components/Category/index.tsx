/* eslint-disable react/function-component-definition */
import { useState } from 'react';

interface CategoryButtonProps {
  children: React.ReactNode;
}

const CategoryButton = ({ children }: CategoryButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={`flex h-51 w-100 items-center justify-center rounded-15 border border-green-300 text-lg-medium md:h-53 md:w-127 md:text-2lg-medium ${isActive ? 'bg-black-100 text-white' : 'text-green-300'}`}
      >
        {children}
      </button>
    </div>
  );
};

export default CategoryButton;
