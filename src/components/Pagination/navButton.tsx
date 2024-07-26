import React from 'react';

interface NavButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  disabled,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-55 h-55 sm:w-40 sm:h-40 box-border bg-white border rounded-15 hover:bg-gray-200
        ${disabled ? 'border-gray-400 text-gray-400' : 'border-green-950 text-black'} 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default NavButton;
