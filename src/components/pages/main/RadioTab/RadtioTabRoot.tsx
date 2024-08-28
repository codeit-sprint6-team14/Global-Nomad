import { ReactNode, useState } from 'react';

import { RadioTabContext } from './RadioTabContext';

type RadioTabRootProps = {
  children: ReactNode;
  defaultTab: string;
  onTabChange?: (tab: string) => void;
};

export const RadioTabRoot: React.FC<RadioTabRootProps> = ({ children, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <RadioTabContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>{children}</RadioTabContext.Provider>
  );
};
