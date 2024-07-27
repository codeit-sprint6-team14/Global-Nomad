import { CategoryButtonProps } from '@/types/buttonTypes';

const CategoryButton = ({ className = '', children, isActive, onClick, ...rest }: CategoryButtonProps) => {
  const getCategoryButtonStyles = (isActive: boolean | undefined, className: string) => {
    const baseStyle = 'items-center justify-center rounded-6 border border-green-300';
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
