import { CategoryButtonProps } from '@/types/buttonTypes';

import BaseButton from './baseButton';

const CategoryButton = ({ className = '', isActive, ...props }: CategoryButtonProps) => {
  const getCategoryButtonStyles = (isActive: boolean | undefined, className: string) => {
    const baseStyle = 'items-center justify-center rounded-6 border border-green-300';
    const activeStyle = isActive ? 'bg-black-100 text-white' : 'text-green-300';

    return `${baseStyle} ${activeStyle} ${className}`;
  };

  return <BaseButton className={getCategoryButtonStyles(isActive, className)} {...props} />;
};

export default CategoryButton;
