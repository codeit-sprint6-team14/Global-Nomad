import { ReactNode, useEffect, useState } from 'react';

import { RadioTabContext } from './RadioTabContext';

type RadioTabRootProps = {
  children: ReactNode;
  defaultTab: string;
  onTabChange: (tab: string) => void;
};

export const RadioTabRoot: React.FC<RadioTabRootProps> = ({ children, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  return <RadioTabContext.Provider value={{ activeTab, setActiveTab }}>{children}</RadioTabContext.Provider>;
};
