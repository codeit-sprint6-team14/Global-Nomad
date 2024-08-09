import { ReactNode, useState } from 'react';

import RadioTabContext from './RadioTabContext';

type RadioTabRootProps = {
  children: ReactNode;
  defaultActiveTab: string;
};

const RadioTabRoot: React.FC<RadioTabRootProps> = ({ children, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <RadioTabContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </RadioTabContext.Provider>
  );
};
export default RadioTabRoot;
