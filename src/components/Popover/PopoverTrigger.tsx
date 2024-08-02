import { ReactNode, useContext, useRef } from 'react';

import { PopoverContext } from './PopoverRoot';

type PopoverTriggerProps = {
  children: ReactNode;
};

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const context = useContext(PopoverContext);
  const triggerRef = useRef<HTMLDivElement>(null);
  if (!context) {
    throw new Error('PopoverTrigger must be used within a PopoverRoot');
  }
  const { toggle, setTriggerRect } = context;

  const handleClick = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerRect(rect);
    }
    toggle();
  };

  return (
    <div ref={triggerRef} onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
};
