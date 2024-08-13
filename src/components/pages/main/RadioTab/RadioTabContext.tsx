import { createContext } from 'react';

export type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const RadioTabContext = createContext<TabContextType | undefined>(undefined);
