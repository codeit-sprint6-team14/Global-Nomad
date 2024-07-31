import { ReactNode, createContext, useState } from 'react';

type PopoverContextType = {
  isOpen: boolean;
  toggle: () => void;
};

export const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

type PopoverRootProps = {
  children: ReactNode;
};

export const PopoverRoot = ({ children }: PopoverRootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <PopoverContext.Provider value={{ isOpen, toggle }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  );
};
