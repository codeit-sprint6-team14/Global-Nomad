import { CategoryButtonProps } from '@/types/buttonTypes';

const CategoryButton = ({ className = '', children, isActive, onClick, ...rest }: CategoryButtonProps) => {
  const getCategoryButtonStyles = (isActive: boolean | undefined, className: string) => {
    const baseStyle =
      'h-51 w-100 items-center justify-center rounded-6 border border-green-300 md:h-53 md:w-127 md:text-2lg-medium';
    const activeStyle = isActive ? 'bg-black-100 text-white' : 'text-green-300';

    return `${baseStyle} ${activeStyle} ${className}`;
  };

  return (
    <button className={getCategoryButtonStyles(isActive, className)} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default CategoryButton;
