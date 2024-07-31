import { ReactNode, useContext } from 'react';

import { PopoverContext } from './PopoverRoot';

type PopoverTriggerProps = {
  children: ReactNode;
};

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('PopoverTrigger must be used within a PopoverRoot');
  }
  const { toggle } = context;

  return (
    <div onClick={toggle} className="cursor-pointer">
      {children}
    </div>
  );
};
