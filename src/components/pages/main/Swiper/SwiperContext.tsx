import { createContext, useContext } from 'react';

type SwiperContextType = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

export const SwiperContext = createContext<SwiperContextType | undefined>(undefined);

export const useSwiperContext = () => {
  const context = useContext(SwiperContext);
  if (!context) {
    throw new Error('SwiterContext must be used within a SwiperRoot');
  }
  return context;
};
