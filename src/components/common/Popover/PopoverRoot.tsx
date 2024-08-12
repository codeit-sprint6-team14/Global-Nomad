import { ReactNode, createContext, useCallback, useState } from 'react';

type PopoverContextType = {
  isOpen: boolean;
  toggle: (forceOpen?: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect) => void;
};

export const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

type PopoverRootProps = {
  children: ReactNode;
};

export const PopoverRoot = ({ children }: PopoverRootProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const toggle = useCallback((forceOpen?: boolean) => {
    if (typeof forceOpen === 'boolean') {
      setIsOpen(forceOpen);
    } else {
      setIsOpen((prev) => !prev);
    }
  }, []);

  return (
    <PopoverContext.Provider value={{ isOpen, toggle, triggerRect, setTriggerRect }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  );
};
