import { ReactNode, createContext, useState } from 'react';

export type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const RadioTabContext = createContext<TabContextType | undefined>(undefined);

type RadioTabRootProps = {
  children: ReactNode;
  defaultTab: string;
};

export const RadioTabRoot: React.FC<RadioTabRootProps> = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return <RadioTabContext.Provider value={{ activeTab, setActiveTab }}>{children}</RadioTabContext.Provider>;
};
