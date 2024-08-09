import { createContext } from 'react';

type TabContextProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const RadioTabContext = createContext<TabContextProps | undefined>(undefined);

export default RadioTabContext;
