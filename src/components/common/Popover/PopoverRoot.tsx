import { ReactNode, createContext, useState } from 'react';

type PopoverPosition = {
  x: number;
  y: number;
};

type PopoverContextType = {
  isOpen: boolean;
  toggle: () => void;
  position: PopoverPosition;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect) => void;
};

export const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

type PopoverRootProps = {
  children: ReactNode;
  position: PopoverPosition;
};

export const PopoverRoot = ({ children, position }: PopoverRootProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <PopoverContext.Provider value={{ isOpen, toggle, position, triggerRect, setTriggerRect }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  );
};
