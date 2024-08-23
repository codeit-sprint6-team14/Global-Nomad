import { ReactNode, useState } from 'react';

import { SwiperContext } from './SwiperContext';

type SwiperRootProps = {
  children: ReactNode;
};

const SwiperRoot: React.FC<SwiperRootProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return <SwiperContext.Provider value={{ currentIndex, setCurrentIndex }}>{children}</SwiperContext.Provider>;
};

export default SwiperRoot;
