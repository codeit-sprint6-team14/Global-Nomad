import { type HTMLAttributes, type ReactNode, useContext, useEffect, useRef } from 'react';

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
  const { isOpen, position, triggerRect } = context;

  useEffect(() => {
    if (isOpen && contentRef.current && triggerRect) {
      const { width, height, left, top } = triggerRect;

      const xPos = left + (width * position.x) / 100;
      const yPos = top + (height * position.y) / 100;

      contentRef.current.style.position = 'fixed';
      contentRef.current.style.left = `${xPos}px`;
      contentRef.current.style.top = `${yPos}px`;
    }
  }, [isOpen, position, triggerRect]);

  if (!isOpen) return null;

  return (
    <div ref={contentRef} onClick={onClick} className="z-10 cursor-pointer rounded-md bg-white shadow-lg" {...props}>
      {children}
    </div>
  );
};
