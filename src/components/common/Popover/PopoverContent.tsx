import { type HTMLAttributes, type ReactNode, useContext, useRef } from 'react';

import { PopoverContext } from './PopoverRoot';

type PopoverContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  onClick?: () => void;
};

export const PopoverContent = ({ children, onClick, ...props }: PopoverContentProps) => {
  const context = useContext(PopoverContext);
  const contentRef = useRef<HTMLDivElement | null>(null);
  if (!context) {
    throw new Error('PopoverContent must be used within a PopoverRoot');
  }
  const { isOpen } = context;

  if (!isOpen) return null;

  return (
    <div ref={contentRef} onClick={onClick} className="z-10 cursor-pointer rounded-md bg-white shadow-lg" {...props}>
      {children}
    </div>
  );
};
