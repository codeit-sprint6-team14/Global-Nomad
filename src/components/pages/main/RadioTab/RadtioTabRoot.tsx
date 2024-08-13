import { ReactNode, useState } from 'react';

import { RadioTabContext } from './RadioTabContext';

type RadioTabRootProps = {
  children: ReactNode;
  defaultTab: string;
};

export const RadioTabRoot: React.FC<RadioTabRootProps> = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return <RadioTabContext.Provider value={{ activeTab, setActiveTab }}>{children}</RadioTabContext.Provider>;
};
